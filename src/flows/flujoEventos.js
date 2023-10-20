const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { sendPrompt } = require("../config/openai");
const { promptIntencion } = require("../prompts/prompts");
const { flujoRecomendacion } = require("./flujoRecomendacion");
const { flujoSaludo } = require("./flujoSaludo");
const { flujoPagos } = require("./flujoPagos");
const { flujoAgente } = require("./flujoAgente");
const { flujoDespedida } = require("./flujoDespedida");
const { flujoConsulta } = require("./flujoConsulta");
const { flujoPedido, flowImagenProducto } = require("./flujoPedido");
const { createCliente, getClienteByTelephone } = require("../services/cliente.service");
const { flujoRespuesta } = require("./flujoRespuesta");

let CLIENTE;

const flujoBienvenida = addKeyword(EVENTS.WELCOME).addAction(
  async (ctx, { flowDynamic, gotoFlow}) => {
    console.log("VALOR", ctx);

    const numeroDeWhatsapp = ctx.from;
    const mensajeRecibido = ctx.body;

    const cliente = await getClienteByTelephone(ctx.from);

    if(!cliente){
      CLIENTE = await createCliente({
        name: ctx.pushName,
        telephone: ctx.from,
      });
    }
    CLIENTE = cliente
    console.log('CLIENTE VERIFICADO',CLIENTE);

    if (ctx.body.length >= 20) {
      const intencionFlujo = await sendPrompt(promptIntencion(mensajeRecibido));
      const flujoDestino = intencionFlujo.choices[0].message.content;

      switch (flujoDestino) {
        case "flujoSaludo":
          console.log("entro en flujoSaludo");
          gotoFlow(flujoSaludo);
          break;
        case "flujoConsulta":
          console.log("entro en flujoConsulta");
          gotoFlow(flujoConsulta);
          break;
        case "flujoDespedida":
          console.log("entro en flujoDespedida");
          gotoFlow(flujoDespedida);
          break;
        case "flujoPedido":
          console.log("entro en flujoPedido");
          gotoFlow(flujoPedido);
          break;
        case "flujoAgente":
          console.log("entro en flujoAgente");
          gotoFlow(flujoAgente);
          break;
        case "flujoPagos":
          console.log("entro en flujoPagos");
          gotoFlow(flujoPagos);
          break;
        case "flujoRecomendacion":
          gotoFlow(flujoRecomendacion);
        default:
          gotoFlow(flujoRespuesta);
      }
    } else {
      console.log("entrara en saludo");
      gotoFlow(flujoSaludo);
    }
  }
)

const flujoRecibirMedia = addKeyword(EVENTS.MEDIA).addAnswer(
  "Voy a revisar lo que me enviaste",
  { delay: 2000 },
  async (ctx) => {
    console.log(ctx);
    const numeroDeWhatsapp = ctx.from;
    const mensajeRecibido = ctx.body;
  }
);

const flujoRecibirUbicacion = addKeyword(EVENTS.LOCATION).addAnswer(
  "Genial, ya tengo tu ubicación",
  { delay: 2000 },
  async (ctx) => {
    console.log(ctx);
    const numeroDeWhatsapp = ctx.from;
    const mensajeRecibido = ctx.body;
  }
);

const flujoRecibirNotaDeVoz = addKeyword(EVENTS.VOICE_NOTE).addAnswer(
  "Dame un momento voy a escuchar la nota de voz",
  { delay: 2000 },
  async (ctx) => {
    console.log(ctx);
    const numeroDeWhatsapp = ctx.from;
    const mensajeRecibido = ctx.body;
  }
);

const flujoRecibirDocumento = addKeyword(EVENTS.DOCUMENT).addAnswer(
  "Documento recibido",
  { delay: 2000 },
  async (ctx) => {
    console.log(ctx);
    const numeroDeWhatsapp = ctx.from;
    const mensajeRecibido = ctx.body;
  }
);

// const flujoRecibirAction = addKeyword(EVENTS.ACTION)
//     .addAnswer('Documento recibido',
//     {delay: 2000},
//     async (ctx) => {
//       console.log(ctx);
//       const numeroDeWhatsapp = ctx.from;
//       const mensajeRecibido = ctx.body;})

module.exports = {
  flujoBienvenida,
  flujoRecibirMedia,
  flujoRecibirUbicacion,
  flujoRecibirNotaDeVoz,
  flujoRecibirDocumento,
  // flujoRecibirAction
};
