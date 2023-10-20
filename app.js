// CONST
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const { createReadStream } = require("fs");
const { join } = require("path");

// Import the health check route
const healthCheckRouter = require("./src/routes/health-check.route");

// Use the health check route
app.use("/", healthCheckRouter); // You can change the '/api' path to whatever you prefer

app.get("/get-qr", async (_, res) => {
  const QR_PATH = join(process.cwd(), "bot.qr.png");
  const fileStream = createReadStream(QR_PATH);

  res.writeHead(200, { "Content-Type": "image/png" });
  fileStream.pipe(res);
});

require("dotenv").config();
// BOT
const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");
// FLUJOS
const { flujoBienvenida, flujoRecibirMedia, flujoRecibirUbicacion, flujoRecibirNotaDeVoz, flujoRecibirDocumento } = require("./src/flows/flujoEventos");
const { flujoSaludo } = require("./src/flows/flujoSaludo");
const { flujoServicios } = require("./src/flows/flujoServicios");
const { flujoConsulta } = require("./src/flows/flujoConsulta");

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([
    // FLUJOS DE EVENTOS
    flujoBienvenida,
    // flujoRecibirMedia,
    // flujoRecibirUbicacion,
    // flujoRecibirNotaDeVoz,
    // flujoRecibirDocumento,
    // FLUJO DE SALUDO
    // flujoSaludo,
    flujoConsulta,
    flujoServicios
  ]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  },
  {
    globalState: {
    encendido: true,
  }
   }
  );
};

module.exports = {
  app,
  main,
};
