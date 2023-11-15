// Flujo despedida


const { addKeyword } = require("@bot-whatsapp/bot");
const { flujoDespedida } = require("./flujoDespedida");

const keywords = ["respuesta"];
const flujos = [flujoDespedida];

const response = [
	"Le puedo ayudar con alguna otra cosa?",
];

const flujoRespuesta = addKeyword(keywords).addAnswer(response, null, null, flujos);

module.exports = {
	flujoRespuesta,
};
