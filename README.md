# NWEA's Platform Team code sample test

This test attempts to simulate, in a very basic manner, the development work required to implement lambdas that use 
the DynamoDB database to save and read data.  

The code sample test uses *DynamoDB local* to run a local instance of the DynamoDB database:
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html 

## Prerequisites
- node version 10.x installed
- java installed

## Steps to complete
- Run ````npm install````
- Implement the *TODOs* in the ````src/write-data.js```` and ````src/read-data.js```` files, if you have time try to 
    implement the *extra credit TODOs* 
- Test your implementation using the ````npm test```` command and ensure all of the tests pass 
    - If you've attempted the *"query using GSI" extra credit TODO* you will need to enable the skipped test
- Add any additional tests you want! 
    
# Helpful references
- https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html