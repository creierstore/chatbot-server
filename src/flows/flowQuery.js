const { addKeyword, addAnswer } = require("@bot-whatsapp/bot");
const { promptProductos, sendPrompt } = require("../config/openai");
const sequelize = require("../database/database");

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
    `Si, cual es tu consulta
    Este es un ejemplo de pregunta:
    - Tienen monitores de la marca Samsung`,
    // TODO: HACER CONSULTA A BASE DE DATOS
    null,
    async (ctx, { flowDynamic,gotoFlow, state }) => {
      // console.log('USER MESSAGE', ctx.body);
    const numeroDeWhatsapp = ctx.from;
    const mensajeRecibido = ctx.body;
    
    try {
      const consultaSQL = await sendPrompt(promptProductos(mensajeRecibido))
      // console.log('valorSQL', consultaSQL.choices[0].message.content);
  
      let sql = consultaSQL.choices[0].message.content
  
      const respuestaBD = await sequelize.query(sql);
  
      // console.log(respuestaBD);
      // const objetoLimpio =  JSON.stringify(respuestaBD[0].slice(0,4),0,2);

      const productos =  respuestaBD[0].slice(0,5);

      for (const producto of productos) {
        const { title, price } = producto;
        // console.log(`Título: ${title}, Precio: ${price}`);
        const mensajeEnviar = `${title}, Precio: ${price}`
        flowDynamic(mensajeEnviar)
      }
      
      
    } catch (error) {
      flowDynamic('Disculpa ahora mismo no puedo responderte')
      console.log(error.message);      
    }

  },
  [flowProductos, flowUbicacion, flowBotones]
);

module.exports = {
  flowConsulta,
  flowUbicacion,
  flowBotones
};
