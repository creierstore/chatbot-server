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
const { createCliente, getClienteByTelephone } = require("../services/cliente.service");
const { sendPrompt } = require("../config/openai");
const { promptProductos } = require("../prompts/prompts");

const keywords = [
	"pepito", 
	"consulta", 
	"duda",
	"pregunta",
	"saber",
	"Consulda",
	"Cosulta",
	"Conzulta",
	"Conssulta",
	"Consultar",
	"Pregnta",
	"Pergunta",
	"Preguntaa",
	"Preunta",
	"Pretunta",
	"Ddua",
	"Dduda",
	"Dda",
	"Dudaa",
	"Dud",
	"Saberl",
	"Sber",
	"Sabeer",
	"Saberr",
	"Saer"
];
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

let nombre;
let apellidos;
let telefono;

const answer = [
	"Si, cual es tu consulta?",
];


const flujoConsulta = addKeyword(keywords)
.addAnswer(answer, {capture: true}, 
    async (ctx, { flowDynamic, gotoFlow, state }) => {
      console.log('USER MESSAGE', ctx.body);
      const numeroDeWhatsapp = ctx.from;
      const mensajeRecibido = ctx.body;
  }, flujos)

module.exports = {
	flujoConsulta,
};
