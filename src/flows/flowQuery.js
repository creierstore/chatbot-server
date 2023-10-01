const { addKeyword } = require("@bot-whatsapp/bot");

const flowBotones = addKeyword('botones').addAnswer(["Estos son los botones"], {
  delay: 3000,
});

const flowUbicacion = addKeyword([
  "ubicacion",
  "donde estan",
  "ubicados",
  "local",
]).addAnswer("estamos ubicados en tu corazon", null, async (ctx) => {
  console.log(ctx);
  const numeroDeWhatsapp = ctx.from;
  const mensajeRecibido = ctx.body;
});

const flowProductos = addKeyword(["tienen", "tenes"]).addAnswer(
  "Esperame un momento voy a verificar",
  null,
  async (ctx) => {
    console.log(ctx);
    const numeroDeWhatsapp = ctx.from;
    const mensajeRecibido = ctx.body;
  }
);

const flowConsulta = addKeyword(["pregunta", "consulta"]).addAnswer(
  "Si, cual es tu consulta",
  // TODO: HACER CONSULTA A BASE DE DATOS
  null,
  async (ctx) => {
    console.log(ctx);
    const numeroDeWhatsapp = ctx.from;
    const mensajeRecibido = ctx.body;
  },
  [flowProductos, flowUbicacion, flowBotones]
);

module.exports = {
  flowConsulta,
  flowUbicacion,
  flowBotones
};
