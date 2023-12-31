const { addKeyword } = require("@bot-whatsapp/bot");
const { flujoEnvio, flujoMediosEntrega } = require("./flujoEnvio");
const { flujoServicios, flujoMontajeComputadoras, flujoServicioTecnico, flujoMantenimiento, flujoVentaProductos, flujoCCTV } = require("./flujoServicios");
const { flujoConsulta } = require("./flujoConsulta");
const { flujoDespedida } = require("./flujoDespedida");
const { flujoRespuesta } = require("./flujoRespuesta");
const { flujoPedido, flowImagenProducto } = require("./flujoPedido");
const { flujoPagos, flujoPagoShopify } = require("./flujoPagos");
const { flujoRecibirUbicacion } = require("./flujoEventos");
const { flujoRecomendacion } = require("./flujoRecomendacion");
const { flujoUbicacion } = require("./flujoUbicacion");
const { flujoEncuesta } = require("./flujoEncuesta");


const keywords = [
	"alo",
	// "hola",
	// "buenas",
	// "Nanoches",
	// "aloha",
	// "buenas tardes",
	// "buenas noches",
	// "buenos dias",
	// "buenos días",
	// "buen dia",
	// "buen día",
	// "buen dia, q tal?",
	// "buenos dias, q tal?",
	// "buen dia, que tal?",
	// "buenos dias, que tal?",
	// "que tal?",
	// "qué tal?",
	// "holi",
	// "hla",
	// "buena",
	// "buens tardes",
	// "bunos dias",
	// "buenos día",
	// "buen dio",
	// "buen día, q tal?",
	// "buenos días, q tal?",
	// "buen día, ke tal?",
	// "buenos días, ke tal?",
	// "ke tal?",
	// "que tal?",
	// "ké tal?",
	// "holii",
	// "Hola",
	// "Buenas",
	// "Buenas tardes",
	// "Buenos días",
	// "Buenos días",
	// "Buen día",
	// "Buen día, ¿qué tal?",
	// "Buenos días, ¿qué tal?",
	// "Buen día, ¿qué tal?",
	// "Buenos días, ¿qué tal?",
	// "¿Qué tal?",
	// "¿Qué tal?",
	// "¿Qué tal?",
	// "Holi",
];

const answer = ["Bienvenido a Versol Informática, en que puedo ayudarte"];
const flujos = [
	flujoConsulta,
	flujoPedido,
	flujoServicios,
	flujoEnvio,
	flujoDespedida,
	flowImagenProducto,
	flujoRespuesta,
	flujoPagos,
	flujoRecibirUbicacion,    
    flujoRecomendacion,
    flujoUbicacion,
    flujoMediosEntrega,
    flujoPagoShopify,
    flujoMontajeComputadoras,
    flujoServicioTecnico,
    flujoVentaProductos,
    flujoMantenimiento,
    flujoCCTV,
];

const flujoSaludo = addKeyword(keywords).addAnswer(answer, {delay: 1500}, 
	async (ctx, { flowDynamic, gotoFlow, state }) => {
		const numeroDeWhatsapp = ctx.from;
		const mensajeRecibido = ctx.body;

		console.log("EL MENSAJE",mensajeRecibido);
	});

// const flujoSaludo = addKeyword(keywords).addAnswer(response, {delay: 3000}, 
// 	async (ctx, { flowDynamic, gotoFlow, state }) => {
// 		console.log('USER MESSAGE', ctx);
// 		const numeroDeWhatsapp = ctx.from;
// 		const mensajeRecibido = ctx.body;
// 		flowDynamic("Un momento por favor, te envio una imagen");
// 		gotoFlow(flowImagenProducto);
	
// 	}, flujos);
	
	
module.exports = {
flujoSaludo
};
  