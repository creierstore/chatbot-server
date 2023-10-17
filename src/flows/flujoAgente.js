const { addKeyword } = require("@bot-whatsapp/bot");


// TODO: habilitar black list por X tiempo cuando entre en este flujo
const flujoAgente = addKeyword(["vendedor", 'asesor']).addAnswer(
    "Ok, aguarda un momento, en breve un asesor de ventas se comunicara contigo, gracias!",
    null,
    async (ctx) => {
      // console.log(ctx);
      const numeroDeWhatsapp = ctx.from;
      const mensajeRecibido = ctx.body;
    }
  );


module.exports = {
  flujoAgente
};
  