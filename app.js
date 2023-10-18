// CONST
const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
// BOT
const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");
const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");
// FLUJOS
const { flujoSaludo } = require("./src/flows/flujoSaludo");

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flujoSaludo]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

main();

module.exports = app;
