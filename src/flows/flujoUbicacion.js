// envio
// respuesta
// despedida


const { addKeyword } = require("@bot-whatsapp/bot");
const { flujoDespedida } = require("./flujoDespedida");
const { flujoEnvio } = require("./flujoEnvio");
const { flujoRespuesta } = require("./flujoRespuesta");

const keywords = ["ubicacion", "ubi"];
const flujos = [flujoEnvio, flujoRespuesta, flujoDespedida];

const response = ["Te paso la ubicacion", "maps.google.com/versol"];

const flujoUbicacion = addKeyword(keywords).addAnswer(response, null, null, flujos);

module.exports = {
	flujoUbicacion,
};
