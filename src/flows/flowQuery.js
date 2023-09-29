const { addKeyword } = require("@bot-whatsapp/bot");

const flowConsulta = addKeyword(["pregunta", 'consulta', 'tenes']).addAnswer(
    "Esperame un momento voy a verificar",
    // TODO: HACER CONSULTA A BASE DE DATOS
    null,
    async (ctx) => {
      console.log(ctx);
      const numeroDeWhatsapp = ctx.from;
      const mensajeRecibido = ctx.body;
    }
  );


module.exports = {
  flowConsulta
};
  