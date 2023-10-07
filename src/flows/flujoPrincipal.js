const { addKeyword } = require("@bot-whatsapp/bot");
const { flujoEnvio } = require("./flujoEnvio");

// Flujo Consulta
// Flujo Pedido
// Flujo Servicios
// Flujo Respuesta
// Flujo Despedida

// Importar todo

const keywords = ["hola", "buenas"];
const response = ["Bienvenidos a Versol Informática, en que te podemos ayudar?"];
const flujos = [flujoEnvio]

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
  