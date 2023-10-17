// Encuesta bb
// Respuesta bb

const { addKeyword } = require("@bot-whatsapp/bot");

const mensajes = [
	"Gracias, por comunicarte con nosotros, esperamos verte pronto.",
];

const flujoDespedida = addKeyword("gracias")
.addAnswer(mensajes);


module.exports = {
	flujoDespedida,
}