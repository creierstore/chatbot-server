const { addKeyword, addAnswer } = require("@bot-whatsapp/bot");
const { promptProductos, sendPrompt } = require("../config/openai");
const sequelize = require("../database/database");
const Cliente = require("../models/cliente.models");
const { createCliente } = require("../services/cliente.service");

let PRODUCTOS = [];
let USERDATA = [];

// const flowPedido = addKeyword('quiero').addAnswer(["Estos son los botones"], {
//   delay: 3000,
// });

// const flowUbicacion = addKeyword([
//   "ubicacion",
//   "donde estan",
//   "ubicados",
//   "local",
// ]).addAnswer("estamos ubicados en tu corazon", null, async (ctx) => {
//   console.log(ctx);
//   const numeroDeWhatsapp = ctx.from;
//   const mensajeRecibido = ctx.body;
// });

// const flowProductos = addKeyword(["tienen", "tenes"]).addAnswer(
//   "Esperame un momento voy a verificar",
//   null,
//   async (ctx) => {
//     console.log(ctx);
//     const numeroDeWhatsapp = ctx.from;
//     const mensajeRecibido = ctx.body;
//   }
//   );

  const flowConsulta = addKeyword(["pregunta", "consulta"]).addAnswer(
    `Si, cual es tu consulta
    Este es un ejemplo de pregunta:
    - Tienen monitores de la marca Samsung`,
    // TODO: HACER CONSULTA A BASE DE DATOS
    { capture: true },
    async (ctx, { flowDynamic,gotoFlow, state }) => {
      // console.log('USER MESSAGE', ctx.body);
    const numeroDeWhatsapp = ctx.from;
    const mensajeRecibido = ctx.body;
    
    USERDATA = ctx;
    console.log('Data to Save', USERDATA,USERDATA.from, USERDATA.sender.name);

    const saveUserData = await createCliente({
    name : ctx.sender.name,
    telephone : ctx.from
    })

    console.log('DATOS A SER GUARDADOS',saveUserData);

    
    flowDynamic('Un momento por favor, voy a verificar!')
    try {
      const consultaSQL = await sendPrompt(promptProductos(mensajeRecibido))
      // console.log('valorSQL', consultaSQL.choices[0].message.content);
  
      let sql = consultaSQL.choices[0].message.content
  
      const respuestaBD = await sequelize.query(sql);
  
      // console.log(respuestaBD);
      // const objetoLimpio =  JSON.stringify(respuestaBD[0].slice(0,4),0,2);

      const productos =  respuestaBD[0].slice(0,5);

      PRODUCTOS = productos;

      for (const producto of productos) {
        const { title, price } = producto;
        // console.log(`Título: ${title}, Precio: ${price}`);
        const mensajeEnviar = `*${title}*, *Precio:* ${price}`
        flowDynamic(mensajeEnviar)
      }

    } catch (error) {
      flowDynamic('Disculpa ahora mismo no puedo responderte')
      console.log(error.message);      
    }

  }
)
.addAnswer(
  `Si estas interesado en uno de los productos 
  escribe *quiero* e indica la cantidad y el producto deseado
  
  *Ejemplo:*
  _Quiero 1 Monitor Samsung QTLXX color negro_`, {capture: true}, async (ctx, { flowDynamic,gotoFlow, state }) => {
    console.log('Contexto',ctx.body);

    if(PRODUCTOS.length == 1){
    // CASO ECONOMICO
    // TODO: llamar a funcion para buscar cliente y si no existe guardarlo en la BD

    console.log("entro en caso economico" ,PRODUCTOS[0].id,PRODUCTOS[0].title);
    }else{
      // CASO GPT
    console.log("entro en caso caroo");

    }


    // TODO manejar pedido con chatgpt, generar una consulta a base de datos otra vez
    // En base a la consulta guardar pedido en base de datos. ->> Flow ubicacion, o forma de pago, o generar link con 
    // shopify api para pagar en la web de shopify.

    // !! Otra alternativa. Almacenar pedido como texto plano. Aunque se podria romper en 2 pasos mas
    // Nombre del producto
    // Cantidad. Dos preguntas más
    sendPrompt(`Recibiras un pedido de un producto. `)
    flowDynamic(`Su pedido es: ${ctx.body}. Confirma su pedido?`);
  }, )
// .addAnswer(
//   `Si estas interesado en uno de los productos 
//   escribe *quiero* e indica la cantidad y el producto deseado
  
//   *Ejemplo:*
//   Quiero 1 Monitor Samsung QTLXX color negro`, {capture: true}, async (ctx, { flowDynamic,gotoFlow, state }) => {
//     console.log('Contexto',ctx.body);
//   }, )


module.exports = {
  flowConsulta,
  // flowUbicacion,
  // flowPedido
};
