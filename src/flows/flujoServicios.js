// consulta
// despedida
// respuesta


const { addKeyword } = require("@bot-whatsapp/bot");
const { flujoDespedida } = require("./flujoDespedida");
const { flujoConsulta } = require("./flujoConsulta");
const { flujoRespuesta } = require("./flujoRespuesta");

const keywords = ["servicios"];
const flujos = [flujoDespedida, flujoRespuesta, flujoConsulta];

const response = [
	"Estos son los servicios:",
	"Servicio 1",
	"Servicio 2",
	"Servicio 3",
];

const flujoServicios = addKeyword(keywords).addAnswer(response, null, null, flujos);

module.exports = {
	flujoServicios,
};
