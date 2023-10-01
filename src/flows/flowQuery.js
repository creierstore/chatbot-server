const { addKeyword } = require("@bot-whatsapp/bot");
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

let sql;

const flowConsulta = addKeyword(["pregunta", "consulta"]).addAnswer(
  `Si, cual es tu consulta
  Este es un ejemplo de pregunta:
  - Tienen monitores de la marca Samsung`,
  // TODO: HACER CONSULTA A BASE DE DATOS
  null,
  async (ctx) => {
    console.log(ctx);
    const numeroDeWhatsapp = ctx.from;
    const mensajeRecibido = ctx.body;

    try {
      const consultaSQL = await sendPrompt(promptProductos(mensajeRecibido))
      console.log('valorSQL', consultaSQL.choices[0].message.content);
  
      sql = consultaSQL.choices[0].message.content
  
      const respuestaBD = await sequelize.query(sql);
  
      console.log(respuestaBD);
  
    } catch (error) {
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
