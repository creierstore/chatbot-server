// Respuesta


const { addKeyword } = require("@bot-whatsapp/bot");



const keywords = [
    "encuesta"
];
const response = [
	"Califica tu experiencia con nuestro servicio. Gracias",
	"https://forms.gle/pg5XkANXn4g6W8qZ9",
];


const flujoEncuesta = addKeyword(keywords).addAnswer(response);

module.exports = {
	flujoEncuesta,
};
