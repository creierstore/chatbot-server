


const dialogflow = require('dialogflow');
const structjson = require('structjson');
require('dotenv').config();




const { addKeyword, addAnswer } = require("@bot-whatsapp/bot");


// console.log(process.env);


// Replace these values with your own
const projectId = "vendedorbot-bgkb";
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);


const CONFIGURATION = {
	credentials: {
		private_key: CREDENTIALS["private_key"],
		client_email: CREDENTIALS["client_email"],
	},
};

const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

// console.log(CONFIGURATION);

async function detectIntent(text, sessionId) {
  // The path to your Dialogflow agent's project ID
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // The text query from the user
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: text,
        languageCode: 'es', // Replace with the desired language code
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    // console.log(JSON.stringify(responses, 0, 2));
    const result = responses[0].queryResult;
    const intent = result.intent.displayName;
    const parameters = structjson.structProtoToJson(result.parameters);

    return {
      intent,
      parameters,
    };
  } catch (error) {
    console.error('Error detecting intent:', error);
    throw error;
  }
}

// Example usage
const userInput = 'alo!';
const sessionId = 'unique-session-id'; // You can generate a unique session ID

// detectIntent(userInput, sessionId)
//   .then((response) => {
//     console.log('Detected Intent:', response.intent, {response});
//     console.log('Parameters:', response.parameters);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });


  module.exports = {detectIntent}