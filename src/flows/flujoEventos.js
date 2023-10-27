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
const { flujoEncuesta } = require("./flujoEncuesta");
const { flujoServicios, flujoMontajeComputadoras, flujoServicioTecnico, flujoVentaProductos, flujoMantenimiento, flujoCCTV } = require("./flujoServicios");

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
          console.log("entro en flowConsulta");
          gotoFlow(flowConsulta);
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
        case "flujoMontajeComputadoras":
          console.log("entro en flujoMontajeComputadoras");
          gotoFlow(flujoMontajeComputadoras);
          break;
        case "flujoServicioTecnico":
          console.log("entro en flujoServicioTecnico");
          gotoFlow(flujoServicioTecnico);
          break;
        case "flujoVentaProductos":
          console.log("entro en flujoVentaProductos");
          gotoFlow(flujoVentaProductos);
          break;
        case "flujoMantenimiento":
          console.log("entro en flujoMantenimiento");
          gotoFlow(flujoMantenimiento);
          break;    
        case "flujoCCTV":
          console.log("entro en flujoCCTV");
          gotoFlow(flujoCCTV);
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

const flowAyuda = addKeyword(['ayuda'])
  .addAction(async (_, { flowDynamic }) => {
    return flowDynamic('¡Estoy aquí para ayudarte! ¿Necesitas ayuda con alguno de los siguientes temas?:\n 1. Información de producto.\n 2. Soporte técnico.\n 3. Otras consultas.');
  })
  .addAction({ capture: true }, async (ctx, { flowDynamic }) => {
    const opcion = parseInt(ctx.body);
    switch (opcion) {
      case 1: return flowDynamic('Especifica qué producto te interesa.');
      case 2: return flowDynamic('Describe el problema que tienes.');
      case 3: return flowDynamic('Proporciona más detalles sobre tu consulta.');
    }
  }); //node --trace-warnings index.js

const flujoRecibirUbicacion = addKeyword(EVENTS.LOCATION)
.addAnswer("Gracias por la ubicacion.", {capture: true}, async (ctx, {}) => {
  console.log("UBICACIONNN ", ctx.body)
});

// ,
//   { delay: 2000 },
//   async (ctx, {gotoFlow}) => {
//     console.log(ctx.body);
//     // const numeroDeWhatsapp = ctx.from;
//     // const mensajeRecibido = ctx.body;
//     // gotoFlow(flujoEncuesta)
//   }

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
  flowAyuda
  // flujoRecibirAction
};
