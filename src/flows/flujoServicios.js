const { addKeyword } = require("@bot-whatsapp/bot");
const { flujoDespedida } = require("./flujoDespedida");
const { flujoConsulta } = require("./flujoConsulta");
const { flujoRespuesta } = require("./flujoRespuesta");

// const keywords = ["servicios"];
// const flujos = [];

const keywords = [
	"servicio", 
	"Serbicios",
	"Sevricios",
	"Servicos",
	"Serviciosss",
	"Serbisios",
	"disponible", 
	"describir"
];
const answer1 = [ "Claro, con gusto te puedo describir los servicios que tenemos disponibles."]
const answer2 = [
  `*Nuestros servicios disponibles incluyen:*
  - Montaje de computadoras.
  - Servicio técnico en general.
  - Mantenimiento preventivo de equipos informáticos.
  - Instalacion de camaras de seguridad (CCTV).
  - Venta de productos informáticos.`
];
const answer3 = ["Si estás interesado en alguno de ellos te puedo dar más información"];

const flujoServicios = addKeyword(keywords).addAnswer(answer1, {delay: 1500}).addAnswer(answer2, {delay: 2000}).addAnswer(answer3, {delay: 2000});

module.exports = {
  flujoServicios,
};
