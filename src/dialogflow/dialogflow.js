const dialogflow = require("dialogflow");
const structjson = require("structjson");
const path = require("path");

process.chdir(path.resolve(__dirname, "../../"));
require("dotenv").config();

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const projectId = "vendedorbot-bgkb";
const CONFIGURATION = {
  credentials: {
    private_key: CREDENTIALS["private_key"],
    client_email: CREDENTIALS["client_email"],
  },
};

const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

async function detectIntent(text, sessionId) {
  // The path to your Dialogflow agent's project ID
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
  // The text query from the user
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: text,
        languageCode: "es",
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    const intent = result.intent.displayName;
    const parameters = structjson.structProtoToJson(result.parameters);

    return {
      intent,
      parameters,
    };
  } catch (error) {
    console.error("Error detecting intent:", error);
    throw error;
  }
}

module.exports = { detectIntent };
