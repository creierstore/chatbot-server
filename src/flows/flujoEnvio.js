// Despedida
// Envuesta
// Respuesta

const { addKeyword } = require("@bot-whatsapp/bot");
const { flujoDespedida } = require("./flujoDespedida");
const { flujoEncuesta } = require("./flujoEncuesta");
const { flujoRespuesta } = require("./flujoRespuesta");



const keywords = [
    "envio"
];
const flujos = [flujoEncuesta, flujoRespuesta, flujoDespedida];

const response = [
	"Si, tenemos servicio de delivery con costo adicional, 20 mil Gs",
];


const flujoEnvio = addKeyword(keywords).addAnswer(response, null, null, flujos);

module.exports = {
	flujoEnvio,
};
