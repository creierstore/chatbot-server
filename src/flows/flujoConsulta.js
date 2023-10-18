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

let nombre;
let apellidos;
let telefono;

// const flowObtenerProductos = addKeyword(['productos'])
//     .addAnswer(
//         ['Claro, ¡voy a buscar los productos para ti!'],
//         null,
//         async (ctx, { flowDynamic, endFlow }) => {
//             try {
//                 const response = await axios.get('http://localhost:4000/productos');
//                 const productos = response.data;

//                 if (productos.length === 0) {
//                     return flowDynamic('Lo siento, no hay productos disponibles en este momento.');
//                 } else {
//                     // Aquí puedes formatear la lista de productos como desees
//                     const formattedProductos = productos.map((producto, index) => {
//                         return `${index + 1}. ${producto.title} - Precio: ${producto.price}`;
//                     }).join('\n');

//                     return flowDynamic(`Aquí tienes algunos de nuestros productos:\n${formattedProductos}`);
//                 }
//             } catch (error) {
//                 console.error(error);
//                 return flowDynamic('Lo siento, hubo un error al obtener los productos. Por favor, inténtalo más tarde.');
//             }
//         }
//     );

module.exports = {
	flujoConsulta,
};
