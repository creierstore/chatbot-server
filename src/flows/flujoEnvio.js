// Despedida
// Envuesta
// Respuesta

const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { flujoDespedida } = require("./flujoDespedida");
const { flujoEncuesta } = require("./flujoEncuesta");
const { flujoRespuesta } = require("./flujoRespuesta");
const { detectIntent } = require("../dialogflow/dialogflow");
const { flujoRecibirUbicacion, flowAyuda } = require("./flujoEventos");



const keywords = [
    "envio",
	"delivery",
];
const flujos = [flujoEncuesta, flujoRespuesta, flujoDespedida];

const response = [
	"El servicio de delivery tiene un costo adicional, 20 mil Gs", "Acepta el envío?, responda con si o no"
];

const flujoConfirmacionEnvio = addKeyword(['si', "Si", 'sí','Sí'])
.addAnswer("Me podria facilitar la ubicación para la entrega", {capture: true},
async (ctx, {flowDynamic, gotoFlow})=>{
console.log("QUISO CONFIRMAR");
flowDynamic('Muchas gracias')
gotoFlow(flujoEncuesta)
})

const flujoEnvio = addKeyword(keywords).addAnswer(response, {capture: true}, 
	async (ctx, {gotoFlow, flowDynamic}) =>{
	console.log('mensaje confirmacion?',ctx.body);
	
	// if (ctx.body.toLowerCase().trim() == "si") {
	// 	flowDynamic('Me podria facilitar la ubicación para la entrega');
	// 	gotoFlow(flujoRecibirUbicacion);
	// } else {
	// 	flowDynamic('Entiendo, puede pasar a retirar aqui, maps.google.com/versol')
	// }
	

	// if(ctx.body == 'Si'){
	// }else{
	// flowDynamic('Entiendo, puede pasar a retirar aqui, maps.google.com/versol')
	// }
	}, [flujoConfirmacionEnvio]);

const flujoMediosEntrega = addKeyword(EVENTS.ACTION)
.addAnswer('Cómo le gustaria recibir su pedido? Pasará a retirar del local o le enviamos por delivery?', {capture: true}, 
async (ctx, {gotoFlow, flowDynamic, fallBack})=> {
console.log("EL MENSAJE EN MEDIO DE ENTREGA",ctx.body);

const userInput = 'alo!';
const sessionId = 'unique-session-id'; // You can generate a unique session ID


	const { intent } = await detectIntent(ctx.body, sessionId);
	console.log("INTENTTT", intent);

	if (intent === 'entregaDelivery') {
		console.log("Llevar al flujo de delivery");
		gotoFlow(flujoEnvio) // delivery
	} else if (intent === 'entregaLocal') {
		console.log("Llevar al flujo de local");
		// gotoFlow() // local
	} else {
		return fallBack("Lo siento no le he entendido, intente de nuevo");
	}


})

module.exports = {
	flujoEnvio,
	flujoMediosEntrega
};
