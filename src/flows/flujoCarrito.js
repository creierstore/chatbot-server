// Pagos
// Ubicacion
// Respuesta
const { addKeyword } = require("@bot-whatsapp/bot");

const { flujoPagos } = require("./flujoPagos");
const { flujoRespuesta } = require("./flujoRespuesta");
const { flujoUbicacion } = require("./flujoUbicacion");

const keywords = ["carrito"];
const flujos = [flujoPagos, flujoUbicacion, flujoRespuesta];

const response = [
  "Estos son los servicios:",
  "Servicio 1",
  "Servicio 2",
  "Servicio 3"
];

const flujoCarrito = addKeyword(keywords).addAnswer(
  response,null,null
);

module.exports = {
  flujoCarrito,
};
