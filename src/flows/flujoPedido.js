const { addKeyword } = require("@bot-whatsapp/bot");
const { flujoUbicacion } = require("./flujoUbicacion");
const { flujoEnvio } = require("./flujoEnvio");
const { flujoDespedida } = require("./flujoDespedida");
const { flujoRespuesta } = require("./flujoRespuesta");

// Pagos
// Ubicacion
// Envio 
// Despedida
// Encuesta
// Carrito
// Respuesta

// Importar todo


// const axios = require("axios");

// const flowWelcome = addKeyword("hola").addAnswer(
//   "¿Como es tu mail?",
//   null,
//   async (ctx) => {
//     console.log(ctx);
//     const numeroDeWhatsapp = ctx.from;
//     const mensajeRecibido = ctx.body;
//   }
// );

// const flowProductos = addKeyword(["informatica", "siguiente"])
//   .addAnswer(["Solo te vamos a estafar jaja"])
//   .addAnswer(
//     [
//       "¿Qué productos estás buscando?",
//       "Tenemos productos de moda",
//       "Y de informática",
//     ],
//     null,
//     null,
//     []
//   );

// const flowInicial = addKeyword([
//   "hola",
//   "buenas",
//   "alo",
//   "pito",
//   "holi",
//   "que tal",
//   "como estas",
//   "holaa",
//   "saludos",
// ])
//   .addAnswer("Buenas, como te puedo ayudar?")
//   .addAnswer(
//     [
//       "Si estás buscando un producto informatica, escribe *informatica* o ",
//       "si te gustaría hablar con un vendedor, escribe *vendedor*",
//     ],
//     null,
//     async (ctx, { gotoFlow, state }) => {
//       gotoFlow(flujoTransferencia);
//     },
//     [flowProductos]
//   );

// const flowImagenProducto = addKeyword([""]).addAnswer(
//   ["Te paso los datos bancarios"],
//   {
//     media:
//       "https://gisellearenalsocialmedia.com/wp-content/uploads/2021/02/0b90f137-2a8d-44f4-a420-ff834295ba58.jpg",
//   },
//   null
// );

// let products;

// const flowInicio = addKeyword(["pedido"], { capture: true })
//   .addAnswer(
//     [
//       "Hola, buenisima eleccion",
//       "Te guistaria pagar en efectivo o por transferencia bancaria",
//       products,
//     ],
//     null,
//     async (ctx) => {
//       console.log(ctx);

//       fetchData = await fetch("http://localhost:3000/productos");
//       products = await fetchData.json();
//       console.log(products);

//       const numeroDeWhatsapp = ctx.from;
//       const mensajeRecibido = ctx.body;
//     },
//     []
//   )
//   .addAnswer([JSON.stringify(products, null, 2), "estamos buscando"], {
//     delay: 2000,
//   });
// const flowDelivery = addKeyword(["delivery", "enviar", "entregar"]).addAnswer([
//   "Entro en flowDelivery",
//   "Claro que si, me podrias facilitar tu ubicacion?",
// ]);

// const flowDespedidaVenta = addKeyword(["ubicacion"]).addAnswer([
//   "Entro en flowDespedidaVenta",
//   "Ok, muchas gracias por tu compra, ya esta en camino tu pedido!",
// ]);
// const flowRetira = addKeyword([
//   "retirar",
//   "paso a retirar",
//   "buscar",
// ]).addAnswer(
//   [
//     "Entro en flowRetira",
//     "Ok, esta es mi ubicacion",
//     `https://www.google.com/maps/place/25%C2%B029'22.4%22S+54%C2%B037'45.1%22W/@-25.4895478,-54.631779,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-25.4895478!4d-54.6292041?hl=es&entry=ttu`,
//   ],
//   null,
//   async (ctx, { gotoFlow, state }) => {
//     gotoFlow(flowDespedidaVenta);
//   }
// );
// const flowRecepcionImagen = addKeyword([
//   "este es mi comprobante",
//   "imagen",
// ]).addAnswer(
//   [
//     "Entro en flowRecepcionImagen",
//     "Recibido con exito!",
//     "Pasaras a retirar del local o le te enviamos tu pedido por delivery?",
//   ],
//   null,
//   null,
//   [flowDelivery, flowRetira]
// );
// const enviarProducto = addKeyword('mouse').addAnswer(
//   ['Claro, ¡voy a buscar los productos para ti!'],
//   null,
//   async (ctx, { flowDynamic, endFlow }) => {
//       try {
//           const response = await axios.get('http://localhost:4000/productos');
//           const productos = response.data;

//           if (productos.length === 0) {
//               return flowDynamic('Lo siento, no hay productos disponibles en este momento.');
//           } else {
//               // Aquí puedes formatear la lista de productos como desees
//               const formattedProductos = productos.map((producto, index) => {
//                   return `${index + 1}. ${producto.title} - Precio: ${producto.price}`;
//               }).join('\n');

//               return flowDynamic(`Aquí tienes algunos de nuestros productos:\n${formattedProductos}`);
//           }
//       } catch (error) {
//           console.error(error);
//           return flowDynamic('Lo siento, hubo un error al obtener los productos. Por favor, inténtalo más tarde.');
//       }
//   }
// );

// const flowBuscarProducto1 = addKeyword("pepito")
//   .addAnswer("que producto seria", null, async (ctx) => {
//     console.log(ctx);
//     const numeroDeWhatsapp = ctx.from;
//     const mensajeRecibido = ctx.body;
//   })
//   .addAnswer(
//     ["Claro, ¡voy a buscar los productos para ti!"],
//     null,
//     async (ctx, { flowDynamic, endFlow }) => {
//       try {
//         const response = await axios.get("http://localhost:4000/productos");
//         const productos = response.data;

//         if (productos.length === 0) {
//           return flowDynamic(
//             "Lo siento, no hay productos disponibles en este momento."
//           );
//         } else {
//           // Aquí puedes formatear la lista de productos como desees
//           const formattedProductos = productos
//             .map((producto, index) => {
//               return `${index + 1}. ${producto.title} - Precio: ${
//                 producto.price
//               }`;
//             })
//             .join("\n");

//           return flowDynamic(
//             `Aquí tienes algunos de nuestros productos:\n${formattedProductos}`
//           );
//         }
//       } catch (error) {
//         console.error(error);
//         return flowDynamic(
//           "Lo siento, hubo un error al obtener los productos. Por favor, inténtalo más tarde."
//         );
//       }
//     }
//   );

// let productoEncontrado;

// const GLOBAL_CONTEXT = [];

// // const flowSendImage = addAnswer({media: `${productoEncontrado[0].image}`})

// const flowBuscarProducto = addKeyword(["pepito", "Producto"]).addAnswer(
//   ["Claro, ¿qué producto te gustaría pedir?"],
//   { capture: true, buttons: [{ body: "❌ Cancelar pedido" }] },
//   async (ctx, { flowDynamic, endFlow }) => {
//     if (ctx.body == "❌ Cancelar pedido")
//       return endFlow({ body: "❌ Pedido cancelado ❌" });

//     const productoPedido = ctx.body;

//     try {
//       const response = await axios.get(
//         `http://localhost:4000/productos/buscar/${ctx.body}`
//       );
//        productoEncontrado = response.data;
//       console.log(productoEncontrado);

//       if (!productoEncontrado) {
//         return flowDynamic(
//           `Lo siento, no encontré el producto "${productoPedido}".`
//         );
//       } else {
//         // Aquí puedes formatear la información del producto como desees
//         const productoInfo = `Nombre: ${productoEncontrado[0].title}\nPrecio: ${productoEncontrado[0].price}`;
//         GLOBAL_CONTEXT.push(productoEncontrado)

//         return flowDynamic(`Perfecto, aquí está la información del producto "${productoPedido}":\n${productoInfo}\n\npuedes ver mas detalles del producto en el siguiente link: ${productoEncontrado[0].description}`
//         );
//         // return flowDynamic();
//       }
//     } catch (error) {
//       console.error(error);
//       return flowDynamic(
//         "Lo siento, hubo un error al buscar el producto. Por favor, inténtalo más tarde."
//       );
//     }
//   }
// ).addAnswer('esta es la imagen del producto', async (ctx, { flowDynamic, gotoFlow, state }) => {
//   console.log('the contextooo',GLOBAL_CONTEXT);
//   flowDynamic({media: GLOBAL_CONTEXT[0].image})
// },)
// ;

// const flowRecepcion = addKeyword(["Hola, este es mi pedido", "pedido",])
// .addAnswer([
//   "Entro en flowRecepcion",
//   "Hola, muy buena eleccion!",
//   "Te gustaria pagar en efectivo, online o por transferencia bancaria?"],
//   null,
//   null,    
//   );


// const flowRecepcion = addKeyword(["Hola, este es mi pedido", "pedido",]).addAnswer(["Entro en flowRecepcion","Hola, muy buena eleccion!","Te gustaria pagar en efectivo, online o por transferencia bancaria?",],
//     null,
//     async (ctx, {flowDynamic}) => {
//       const mensajesDB = async () => {
//         const products = await getProductos();
//         return products
//     }
//     return flowDynamic(mensajesDB())
//   }).addAnswer(['Claro, ¡voy a buscar los productos para ti!'],null,
//     async (ctx, { flowDynamic, endFlow }) => {
//         try {
//             const response = await axios.get('http://localhost:4000/productos');
//             const productos = response.data;
            
//             if (productos.length === 0) {
//                 return flowDynamic('Lo siento, no hay productos disponibles en este momento.');
//             } else {
//                 // Aquí puedes formatear la lista de productos como desees
//                 const formattedProductos = productos.map((producto, index) => {
//                     return `${index + 1}. ${producto.title} - Precio: ${producto.price}`;
//                 }).join('\n');
                
//                 return flowDynamic(`Aquí tienes algunos de nuestros productos:\n${formattedProductos}`);
//             }
//         } catch (error) {
//             console.error(error);
//             return flowDynamic('Lo siento, hubo un error al obtener los productos. Por favor, inténtalo más tarde.');
//         }
//     }
//   );


const keywords = ["pedido"];
const flujos = [flujoRespuesta, flujoUbicacion, flujoEnvio, flujoDespedida];

const response = [
	"Estos son los productos:",
	"Servicio 1",
	"Servicio 2",
	"Servicio 3",
];

const flujoPedido = addKeyword(keywords).addAnswer(
	response,
	null,
	null,
	flujos
);

module.exports = {
	flujoPedido,
};




