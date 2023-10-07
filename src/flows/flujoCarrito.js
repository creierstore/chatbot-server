

// Pagos
// Ubicacion
// Respuesta

const { flujoPagos } = require("./flujoPagos");
const { flujoRespuesta } = require("./flujoRespuesta");
const { flujoUbicacion } = require("./flujoUbicacion");


const carrito = [];



const keywords = ["carrito"];
const flujos = [flujoPagos, flujoUbicacion, flujoRespuesta];

const response = [
	"Estos son los servicios:",
	"Servicio 1",
	"Servicio 2",
	"Servicio 3",
];

const flujoCarrito = addKeyword(keywords).addAnswer(
	response,
	null,
	null,
	flujos
);

module.exports = {
	flujoCarrito,
};