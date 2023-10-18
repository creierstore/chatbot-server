// Pagos
// Ubicacion
// Respuesta
const { addKeyword } = require("@bot-whatsapp/bot");

const keywords = ["carrito"];

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
