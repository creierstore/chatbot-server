// Respuesta


const { addKeyword } = require("@bot-whatsapp/bot");



const keywords = [
    "encuesta"
];
const response = [
	"Califica tu experiencia con nuestro servicio. Gracias",
	"link.com/encuesta",
];


const flujoEncuesta = addKeyword(keywords).addAnswer(response);

module.exports = {
	flujoEncuesta,
};
