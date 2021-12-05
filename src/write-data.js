const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  endpoint: new AWS.Endpoint('http://localhost:8000'),
  region: 'us-west-2',
  // what could you do to improve performance?
});

const tableName = 'SchoolStudents';

const eventVerification = (event) => {
  if (!event.schoolId) {
    throw new Error("School ID is missing");
  }
  if (!event.schoolName) {
    throw new Error("School Name is missing");
  }
  if (!event.studentId) {
    throw new Error("Student ID is missing");
  }
  if (!event.studentFirstName) {
    throw new Error("Student First Name is missing");
  }
  if (!event.studentLastName) {
    throw new Error("Student Last Name is missing");
  }
  if (!event.studentGrade) {
    throw new Error("Student Grade is missing");
  }
}
/**
 * The entry point into the lambda
 *
 * @param {Object} event
 * @param {string} event.schoolId
 * @param {string} event.schoolName
 * @param {string} event.studentId
 * @param {string} event.studentFirstName
 * @param {string} event.studentLastName
 * @param {string} event.studentGrade
 */
const handler = async (event) => {
  // TODO validate that all expected attributes are present (assume they are all required)
  // TODO use the AWS.DynamoDB.DocumentClient to save the 'SchoolStudent' record
  // The 'SchoolStudents' table key is composed of schoolId (partition key) and studentId (range key).
  try {
    // validate data on event
    eventVerification(event);

    const params = {
      TableName: tableName,
      Item: {
        schoolId: event.schoolId,
        studentId: event.studentId,
        schoolName: event.schoolName,
        studentFirstName: event.studentFirstName,
        studentLastName: event.studentLastName,
        studentGrade: event.studentGrade
      }
    };


    await dynamodb.put(params).promise();

  } catch (error) {
    console.log("there was an error")
  }
};

exports.handler = handler;