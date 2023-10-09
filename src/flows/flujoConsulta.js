// Flujo Pedido
// // Flujo Despedida
// Flujo Pagos
// Flujo Ubicación
// Flujo Carrito
// Flujo Respuesta
// Flujo Encuesta
// Flujo envio


const { addKeyword } = require("@bot-whatsapp/bot");
const { flujoDespedida } = require("./flujoDespedida");
const { flujoRespuesta } = require("./flujoRespuesta");
const { flujoEnvio } = require("./flujoEnvio");
const { flujoUbicacion } = require("./flujoUbicacion");

const keywords = ["consulta"];
const flujos = [flujoDespedida, flujoRespuesta, flujoEnvio, flujoUbicacion];

const response = [
	"Si, cual es tu consulta?",
];

const flujoConsulta = addKeyword(keywords).addAnswer(response, null, null, flujos);

module.exports = {
	flujoConsulta,
};
