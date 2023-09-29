const { addKeyword } = require("@bot-whatsapp/bot");

const flowBienvenida = addKeyword("hola", 'buenas').addAnswer(
    "Bienvenidos a X, en que te puedo ayudar?",
    null,
    async (ctx) => {
      console.log(ctx);
      const numeroDeWhatsapp = ctx.from;
      const mensajeRecibido = ctx.body;
    }
  );


module.exports = {
flowBienvenida
};
  