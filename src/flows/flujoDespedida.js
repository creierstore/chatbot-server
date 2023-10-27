// Encuesta bb
// Respuesta bb

const { addKeyword } = require("@bot-whatsapp/bot");

const mensajes = [
	"Gracias, por comunicarte con nosotros, si tiene alguna duda más estamos para ayudarte!",
];

const flujoDespedida = addKeyword(["gracias", "agradezco", "grax"])
.addAnswer(mensajes);


module.exports = {
	flujoDespedida,
}