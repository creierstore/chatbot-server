// consulta
// despedida
// respuesta

const { addKeyword } = require("@bot-whatsapp/bot");
const { flujoDespedida } = require("./flujoDespedida");
const { flujoConsulta } = require("./flujoConsulta");
const { flujoRespuesta } = require("./flujoRespuesta");

const keywords = ["servicios"];
const flujos = [];

const response = [
	"Estoy buscando una",
	"Quiero un",
	"Me recomendas",
	"Servicio 3",
];

const flujoServicios = addKeyword(keywords).addAnswer(
	response,
	null,
	null,
	flujos
);

module.exports = {
	flujoServicios,
};
