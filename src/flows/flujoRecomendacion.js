const { addKeyword } = require("@bot-whatsapp/bot");


const flujoRecomendacion = addKeyword(["recomendacion"]).addAnswer(
    // TODO: agregar logica con el prompt que devuelva una recomendacion de compra
    "Ok, aguarda un momento, te pasare algunas recomendaciones!",
    null,
    async (ctx) => {
      // console.log(ctx);
      const numeroDeWhatsapp = ctx.from;
      const mensajeRecibido = ctx.body;
    }
  );


module.exports = {
    flujoRecomendacion
};
  