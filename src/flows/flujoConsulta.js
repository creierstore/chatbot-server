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
const { flujoPedido } = require("./flujoPedido");
const { flujoPagos } = require("./flujoPagos");
const { flujoCarrito } = require("./flujoCarrito");
const { flujoEncuesta } = require("./flujoEncuesta");
const { flujoAgente } = require("./flujoAgente");
const { flujoRecomendacion } = require("./flujoRecomendacion");

const keywords = ["consulta"];
const flujos = [
	flujoPedido,
	flujoDespedida,
	flujoPagos,
	flujoUbicacion,
	flujoCarrito, 
	flujoRespuesta, 
	flujoEncuesta, 
	flujoEnvio,
	flujoAgente,
	flujoRecomendacion
];

const response = [
	"Si, cual es tu consulta?",
];

const flujoConsulta = addKeyword(keywords).addAnswer(response, null, null, flujos);

module.exports = {
	flujoConsulta,
};
