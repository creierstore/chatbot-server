const { addKeyword } = require("@bot-whatsapp/bot");

const flowHablarVendedor = addKeyword(["vendedor", 'asesor']).addAnswer(
    "Ok, aguarda un momento, en breve un asesor de ventas se comunicara contigo, gracias!",
    null,
    async (ctx) => {
      console.log(ctx);
      const numeroDeWhatsapp = ctx.from;
      const mensajeRecibido = ctx.body;
    }
  );


module.exports = {
  flowHablarVendedor
};
  