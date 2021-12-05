const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  endpoint: new AWS.Endpoint('http://localhost:8000'),
  region: 'us-west-2',
});

const tableName = 'SchoolStudents';
const studentLastNameGsiName = 'studentLastNameGsi';

/**
 * The entry point into the lambda
 *
 * @param {Object} event
 * @param {string} event.schoolId
 * @param {string} event.studentId
 * @param {string} [event.studentLastName]
 */

const defaultParams = ({ schoolId }) => ({
  TableName: tableName,
  KeyConditionExpression: '#schoolId = :schoolId',
  ExpressionAttributeNames: {
    "#schoolId": "schoolId"
  },
  ExpressionAttributeValues: {
    ":schoolId": schoolId,
  },
  Limit: 5,
});

const generateParams = (event) => {
  const { studentId, studentLastName } = event;
  const params = Object.assign(defaultParams(event), {});

  if (studentId) {
    params.KeyConditionExpression += " AND #studentId = :studentId"
    params.ExpressionAttributeNames["#studentId"] = "studentId";
    params.ExpressionAttributeValues[":studentId"] = studentId;
  }

  if (studentLastName) {
    params.IndexName = studentLastNameGsiName;
    params.KeyConditionExpression = "#studentLastName = :studentLastName"
    params.ExpressionAttributeNames = { "#studentLastName": "studentLastName" };
    params.ExpressionAttributeValues = { ":studentLastName": studentLastName };
  }
  return params;
}

const handler = async (event) => {
  // TODO use the AWS.DynamoDB.DocumentClient to write a query against the 'SchoolStudents' table and return the results.
  // The 'SchoolStudents' table key is composed of schoolId (partition key) and studentId (range key).
  try {
    const params = generateParams(event);
    let results = [];
    const result = await dynamodb.query(params).promise();

    if (result['Count'] > 0) {
      results = [...result['Items']];
    }

    if (result.LastEvaluatedKey) {
      params.ExclusiveStartKey = result.LastEvaluatedKey;
      const secondResults = await dynamodb.query(params).promise();
      results = [...results, ...secondResults['Items']];
    }

    return results
  } catch (error) {
    console.error("There was an error fetching the students");
    throw new Error("Error fetching students:", error)
  }
};

exports.handler = handler;