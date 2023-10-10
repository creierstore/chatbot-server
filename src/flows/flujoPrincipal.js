const { addKeyword } = require("@bot-whatsapp/bot");
const { flujoEnvio } = require("./flujoEnvio");
const { flujoServicios } = require("./flujoServicios");
const { flujoConsulta } = require("./flujoConsulta");
const { flujoDespedida } = require("./flujoDespedida");
const { flujoRespuesta } = require("./flujoRespuesta");
const { flujoPedido } = require("./flujoPedido");

// Flujo Consulta
// Flujo Pedido
// Flujo Servicios
// Flujo Respuesta
// Flujo Despedida

// Importar todo

const keywords = [
	"hola",
	"buenas",
	"buenas tardes",
	"buenos dias",
	"buenos días",
	"buen dia",
	"buen día",
	"buen dia, q tal?",
	"buenos dias, q tal?",
	"buen dia, que tal?",
	"buenos dias, que tal?",
	"que tal?",
	"qué tal?",
	"holi",
	"hla",
	"buena",
	"buens tardes",
	"bunos dias",
	"buenos día",
	"buen dio",
	"buen día, q tal?",
	"buenos días, q tal?",
	"buen día, ke tal?",
	"buenos días, ke tal?",
	"ke tal?",
	"que tal?",
	"ké tal?",
	"holii",
	"Hola",
	"Buenas",
	"Buenas tardes",
	"Buenos días",
	"Buenos días",
	"Buen día",
	"Buen día, ¿qué tal?",
	"Buenos días, ¿qué tal?",
	"Buen día, ¿qué tal?",
	"Buenos días, ¿qué tal?",
	"¿Qué tal?",
	"¿Qué tal?",
	"¿Qué tal?",
	"Holi",
];
//  En qué te puedo ayudar?. Puedo consultar productos o ayudarte en la compra. Pero si quieres hablar con un representante solo escribe: Hablar con agente.

const response = ["Bienvenido a Versol Informática"];
const flujos = [
	flujoEnvio,
	flujoServicios,
	flujoConsulta,
	flujoDespedida,
	flujoRespuesta,
	flujoPedido,
];

// const flowBienvenida = addKeyword(['hola', 'buenas']).addAnswer(
//     "Bienvenidos a X, en que te puedo ayudar?",
//     null,
//     async (ctx) => {
//       console.log(ctx);
//       const numeroDeWhatsapp = ctx.from;
//       const mensajeRecibido = ctx.body;
//     }
//   );

const flujoPrincipal = addKeyword(keywords).addAnswer(response, null, null, flujos
  );

module.exports = {
// flowBienvenida,
flujoPrincipal
};
  