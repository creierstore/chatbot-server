const { addKeyword } = require("@bot-whatsapp/bot");
const { flujoDespedida } = require("./flujoDespedida");
const { flujoConsultaProducto, flowConsulta2 } = require("./flujoConsulta");
const { flujoRespuesta } = require("./flujoRespuesta");
const { flujoEncuesta } = require("./flujoEncuesta");

// FLUJO VENTA

const keywordsVentaProductos = [
  "venta",
  "productos informáticos",
  "hardware",
  "vienta",
  "ventta",
  "produtos informáticos",
  "productos informatcos",
  "productos informáticoss",
  "hardwar",
  "harware",
  "hardwware",
  "hardeare",
  "harwaree",
  "produtos",
  "productos",
  "productos",
];
const answerVentaProductos1 = [
  "Sí, también ofrecemos una amplia gama de productos informáticos.",
];
const answerVentaProductos2 = [
  "Tenemos una selección de hardware y productos informáticos disponibles para la venta.",
];
const answerVentaProductos3 = [
  "¿Necesitas algún componente específico o producto?",
];

const flujoVentaProductos = addKeyword(keywordsVentaProductos)
  .addAnswer(answerVentaProductos1, { delay: 2000 })
  .addAnswer(answerVentaProductos2, { delay: 2000 })
  .addAnswer(answerVentaProductos3, { delay: 2000 });

// FLUJO CCTV

const keywordsCCTV = [
  "cámaras de seguridad",
  "CCTV",
  "instalación",
  "cámas de seguridad",
  "cámaras de seguridád",
  "camaras de segurida",
  "CCT",
  "CC TV",
  "CCVT",
  "instalacíon",
  "instalaccion",
  "instalasión",
  "instalació",
];
const answerCCTV1 = [
  `Sí, ofrecemos servicios de instalación de cámaras de seguridad (CCTV)
  Nuestro equipo de expertos puede instalar sistemas de cámaras de seguridad para proteger tu hogar o negocio.`,
];
const answerCCTV2 = ["¿En qué tipo de instalación estás interesado?"];
const flujoCCTV = addKeyword(keywordsCCTV)
  .addAnswer(answerCCTV1, { delay: 2000 })
  .addAnswer(
    answerCCTV2,
    { capture: true, delay: 2000 },
    async (ctx, { flowDynamic, gotoFlow }) => {
      // console.log(ctx);
      const numeroDeWhatsapp = ctx.from;
      const mensajeRecibido = ctx.body;
      // TODO> guardar peticion
      console.log("esto es un pedido", mensajeRecibido);
      flowDynamic(
        "Voy a preparar un presupuesto teniendo en cuenta esos datos, apenas te tengo una respuesta te retorno muchas gracias"
      );
      gotoFlow(flujoEncuesta);
    }
  );

// FLUJO MANTENIMIENTO

const keywordsMantenimiento = [
  "mantenimiento",
  "equipos informáticos",
  "mantenimiento preventivo",
  "manteniemiento",
  "mantenimento",
  "mantenimieto",
  "equipos informatcos",
  "equipos infomáticos",
  "equipo informático",
  "mantenimiento preventibo",
  "mantenimiento prevntivo",
  "mantenimientopreventivo",
  "equipo de computadoras",
];
const answerMantenimiento1 = [
  "Sí, ofrecemos servicios de mantenimiento preventivo para equipos informáticos.",
];

const answerMantenimiento2 = [
  `El mantenimiento preventivo es esencial para mantener tus equipos en óptimas condiciones. 
	Podemos programar revisiones periódicas para garantizar un rendimiento óptimo.`,
];
const answerMantenimiento3 = [
  "¿Estás interesado en nuestros servicios de mantenimiento preventivo?",
];
const flujoMantenimiento = addKeyword(keywordsMantenimiento)
  .addAnswer(answerMantenimiento1, { delay: 2000 })
  .addAnswer(answerMantenimiento2, { delay: 2000 })
  .addAnswer(
    answerMantenimiento3,
    { capture: true, delay: 2000 },
    async (ctx, { flowDynamic, gotoFlow }) => {
      // console.log(ctx);
      const numeroDeWhatsapp = ctx.from;
      const mensajeRecibido = ctx.body;
      // TODO> guardar peticion
      console.log("esto es un pedido", mensajeRecibido);
      flowDynamic(
        "Voy a preparar un presupuesto teniendo en cuenta esos datos, apenas te tengo una respuesta te retorno muchas gracias"
      );
      gotoFlow(flujoEncuesta);
    }
  );

//FLUJO SERVICIO TECNICO
const keyMontaje = [
  "montaje",
  "computadora",
  "ensamblaje",
  "montar",
  "pc",
  "montage",
  "compuadora",
  "ensamblage",
  "montaje",
  "PC",
  "pC",
  "Compytadora",
  "ensambalje",
  "montajee",
  "compuetadora",
];

const flujoMontajeComputadoras = addKeyword(keyMontaje)
  .addAnswer(
    "¡Claro! Estamos especializados en el montaje de computadoras a medida.",
    { delay: 2000 }
  )
  .addAnswer(
    "Podemos ensamblar una computadora personalizada que se adapte a tus necesidades",
    { delay: 2000 }
  )
  .addAnswer(
    "¿Qué tipo de especificaciones estás buscando en tu nueva computadora?",
    { capture: true, delay: 2000 },
    async (ctx, { flowDynamic, gotoFlow }) => {
      // console.log(ctx);
      const numeroDeWhatsapp = ctx.from;
      const mensajeRecibido = ctx.body;
      // TODO> guardar peticion
      console.log("esto es un pedido", mensajeRecibido);
      flowDynamic(
        "Voy a preparar un presupuesto teniendo en cuenta esos datos, apenas te tengo una respuesta te retorno muchas gracias"
      );
      gotoFlow(flujoEncuesta);
    }
  );

//FLUJO SERVICIO TECNICO

const keySoporte = [
  "servicio técnico",
  "reparación",
  "soporte técnico",
  "servisio técnico",
  "serbicio técnico",
  "serbicio técnico",
  "servicio téchnico",
  "reparasión",
  "reparaciónn",
  "reparasiónn",
  "soporté técnico",
  "sopórte técnico",
  "sopor téchnico",
  "soporte",
];
const flujoServicioTecnico = addKeyword(keySoporte)
  .addAnswer("Sí, ofrecemos servicios de servicio técnico en general.", {
    delay: 2000,
  })
  .addAnswer(
    "Estamos para ayudarte con la reparación y el soporte técnico de una amplia gama de dispositivos y problemas.",
    { delay: 2000 }
  )
  .addAnswer(
    "¿En qué tipo de servicio técnico estás interesado?",
    { capture: true, delay: 2000 },
    async (ctx, { flowDynamic, gotoFlow }) => {
      // console.log(ctx);
      const numeroDeWhatsapp = ctx.from;
      const mensajeRecibido = ctx.body;
      // TODO> guardar peticion
      console.log("esto es un pedido", mensajeRecibido);
      flowDynamic(
        "Voy a preparar un presupuesto teniendo en cuenta esos datos, apenas te tengo una respuesta te retorno muchas gracias"
      );
      gotoFlow(flujoEncuesta);
    }
  );

//FLUJO PRINCIPAL SERVICIOS
const flujos = [
  flujoMontajeComputadoras,
  flujoServicioTecnico,
  flujoVentaProductos,
  flujoMantenimiento,
  flujoCCTV,
];

const keywords = [
  "servicio",
  "Serbicios",
  "Sevricios",
  "Servicos",
  "Serviciosss",
  "Serbisios",
  "disponible",
  "describir",
];
const answer1 = [
  "Claro, con gusto te puedo describir los servicios que tenemos disponibles.",
];
const answer2 = [
  `*Nuestros servicios disponibles incluyen:*
  - Montaje de computadoras.
  - Servicio técnico en general.
  - Mantenimiento preventivo de equipos informáticos.
  - Instalacion de camaras de seguridad (CCTV).
  - Venta de productos informáticos.`,
];
const answer3 = [
  "Si estás interesado en alguno de ellos te puedo dar más información",
];

const flujoServicios = addKeyword(keywords)
  .addAnswer(answer1, { delay: 1500 })
  .addAnswer(answer2, { delay: 2000 })
  .addAnswer(answer3, { delay: 2000 }, null, flujos);

module.exports = {
  flujoServicios,
};
