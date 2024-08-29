const dialogflow = require('dialogflow');
const uuid = require('uuid');



// Dialogflow configuration
const projectId = process.env.PROJECT_ID ;
const credentialsPath = process.env.CREDENTIALS_PATH ;

// Set Google application credentials
process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;

// Create a new session client
const sessionClient = new dialogflow.SessionsClient();
const createSessionPath = () => {
    const sessionId = uuid.v4();
    return sessionClient.sessionPath(projectId, sessionId);
};

module.exports = { sessionClient, createSessionPath };
