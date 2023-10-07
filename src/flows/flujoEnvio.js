// Despedida
// Envuesta
// Respuesta

const { addKeyword } = require("@bot-whatsapp/bot");
const { flujoDespedida } = require("./flujoDespedida");



const keywords = [
    "envio"
];
const response = [
	"Si, tenemos servicio de delivery con costo adicional, 20 mil Gs",
];


const flujoEnvio = addKeyword(keywords).addAnswer(response, null, null, [flujoDespedida]);

module.exports = {
	flujoEnvio,
};
