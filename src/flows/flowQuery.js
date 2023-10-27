const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { sendPrompt} = require("../config/openai");
const { createCliente, getClienteByTelephone} = require("../services/cliente.service");
// const { searchProducto } = require("../services/producto.service");

// const { createPedido } = require('../controllers/pedidos.controller');
const { promptProductos, promptPedido } = require("../prompts/prompts");
const { postCustomQuery } = require("../services/productos.service");
const { flujoPagos, flujoPagoShopify } = require("./flujoPagos");

let PRODUCTOS = [];
let USERDATA = [];
let CLIENTE = {};

let PRODUCTO_DETALLE = {};
let PRODUCTO_SELECCIONADO = {};

 
const flujoResumenPedido = addKeyword([EVENTS.ACTION, 'si', 'no']).addAnswer('', {capture: true}, async (ctx, {state, flowDynamic, gotoFlow, fallBack}) => {
  
  const myState = state.getMyState();
  console.log(myState);
  if (ctx.body.toLowerCase() === "si") {
    flowDynamic("Ok, procesamos tu pedido. Muchas gracias");
    gotoFlow(flujoPagoShopify);
  } else if (ctx.body.toLowerCase() === "no") {
    flowDynamic("Ok, de acuerdo, tiene alguna otra consulta?")
  } else {
    fallBack("Perdona, no te he entendido, responde con SI o NO");
  }
})

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

const flowConsulta = addKeyword(["pregunta", "consulta"])
  .addAnswer(
`Si, cual es tu consulta te mando un ejemplo de consulta:
- Tienen monitores de la marca Samsung`,
    // TODO: HACER CONSULTA A BASE DE DATOS
    { capture: true },
    async (ctx, { flowDynamic, gotoFlow, state }) => {
      // console.log('USER MESSAGE', ctx.body);
      const numeroDeWhatsapp = ctx.from;
      const mensajeRecibido = ctx.body;

      // USERDATA = ctx;
      // console.log("Data to Save", USERDATA, USERDATA.from, USERDATA.pushName);

    //   const cliente = await getClienteByTelephone(ctx.from);

    // if(!cliente){
    //   CLIENTE = await createCliente({
    //     name: ctx.pushName,
    //     telephone: ctx.from,
    //   });
    // }

    // CLIENTE = cliente
    
    
    // console.log('CLIENTE VERIFICADO',CLIENTE);

      // console.log("CLIENTE ENCONTRADO", CLIENTE);

      // console.log("DATOS A SER GUARDADOS", saveUserData);

      flowDynamic("Un momento por favor, voy a verificar!", {delay: 2000});
      try {
        const consultaSQL = await sendPrompt(promptProductos(mensajeRecibido));

        let sql = consultaSQL.choices[0].message.content;
        const respuestaBD = await postCustomQuery(sql);

        
        const productos = respuestaBD.data.data;
        // const objetoLimpio =  JSON.stringify(productos.slice(0,4),0,2);

        console.log(productos);

        PRODUCTOS = productos;

        for (const producto of productos) {
          const { title, price } = producto;
          // console.log(`Título: ${title}, Precio: ${price}`);
          const mensajeEnviar = `*${title}*, *Precio:* ${price}`;
          flowDynamic(mensajeEnviar);
        }

        flowDynamic(
`Si estas interesado en uno de los productos 
escribe *quiero* e indica la cantidad y el producto deseado
  
*Ejemplo:*
Quiero 1 Monitor Samsung QTLXX color negro`, {delay: 2000})
      } catch (error) {
        flowDynamic("Disculpa ahora mismo no puedo responderte");
        console.log(error.message);
      }
    }
  )
  .addAnswer(
// `Aguardare tu respuesta...`,
// "Estos son los productos que tenemos disponibles actualmente, teniendo en cuenta tu consulta",
"",

    { capture: true },
    async (ctx, { flowDynamic, gotoFlow, state }) => {
      console.log("Contexto", ctx.body);

      const mensajeUser = ctx.body;

      let SQLPRODUCTO = await sendPrompt(promptProductos(mensajeUser));

      const productoVerificado = await postCustomQuery(
        SQLPRODUCTO.choices[0].message.content
      );
      console.log('EL PRODUCTO VERIFICADO ES',productoVerificado.data.data[0]);
      
      if(!productoVerificado.data.data.length){
      return flowDynamic('No pude identificar el producto que mencionaste')
      }



      PRODUCTO_DETALLE = productoVerificado.data.data[0];

      console.log("PRODUCTO_DETALLE", PRODUCTO_DETALLE);

      if (PRODUCTOS.length == 1) {
        // CASO ECONOMICO

        const pedido = await sendPrompt(promptPedido(mensajeUser));
        console.log("PEDIDO", pedido);
        console.log(
          "entro en caso economico",
          PRODUCTOS,
          PRODUCTOS[0].id,
          PRODUCTOS[0].title
        );
        console.log("CLIENTE ID", CLIENTE.id);

        PRODUCTO_SELECCIONADO = JSON.parse(pedido.choices[0].message.content);
        console.log("PRODUCTO_SELECCIONADO",PRODUCTO_SELECCIONADO);
      }else {
        // CASO GPT
        console.log("entro en caso caroo");

        const pedido = await sendPrompt(promptPedido(mensajeUser));

        // console.log('PEDIDO',JSON.stringify(pedido.choices[0].message.content, 0, 2));

        PRODUCTO_SELECCIONADO = JSON.parse(pedido.choices[0].message.content);

        console.log(
          "EL CLIENTE ID ES:",
          CLIENTE.id,
          "EL PRODUCTO_DETALLE ES:",
          PRODUCTO_DETALLE,
          "LA CANTIDAD ES",
          PRODUCTO_SELECCIONADO.cantidad
        );

      //   // const productoPedido = await searchProducto(productoSeleccionado.nombre)

      //   // console.log('EL PRODUCTO PEDIDO',productoPedido);
        PRODUCTO_DETALLE.id;
        CLIENTE.id;
        PRODUCTO_SELECCIONADO.cantidad;
        PRODUCTO_SELECCIONADO.nombre;

      //   // const clienteData = { id: CLIENTE.id };
      //   // const pedidoData = { direccionEnvio: 'definir ubicacion', estado: 'Pendiente' };
      //   // const detallesData = [
      //   //   { id: PRODUCTO_DETALLE[0].id,cantidad: PRODUCTO_SELECCIONADO.cantidad, precioUnitario: PRODUCTO_DETALLE[0].price, precioTotal: PRODUCTO_DETALLE[0].price *  PRODUCTO_SELECCIONADO.cantidad},
      //   // ];

      //   // await createPedido(clienteData, pedidoData, detallesData);


      }

      // TODO manejar pedido con chatgpt, generar una consulta a base de datos otra vez
      // En base a la consulta guardar pedido en base de datos. ->> Flow ubicacion, o forma de pago, o generar link con
      // shopify api para pagar en la web de shopify.

      // sendPrompt(`Recibiras un pedido de un producto. `);
      // flowDynamic(`Su pedido es: ${ctx.body}. Confirma su pedido?`);
//       flowDynamic(
// `Su pedido es: 
// *Cant. | Producto | Precio*
// ${PRODUCTO_SELECCIONADO.cantidad}         | ${PRODUCTO_DETALLE.title} | ${PRODUCTO_DETALLE.price} 
      
// TOTAL: ${PRODUCTO_DETALLE.price * PRODUCTO_SELECCIONADO.cantidad} Gs.
      
// Confirma su pedido?`
//       );

      const resumen = `Su pedido es: 
      *Cant. | Producto | Precio*
      ${PRODUCTO_SELECCIONADO.cantidad}         | ${PRODUCTO_DETALLE.title} | ${PRODUCTO_DETALLE.price} 
            
      TOTAL: ${PRODUCTO_DETALLE.price * PRODUCTO_SELECCIONADO.cantidad} Gs.
            
      Confirma su pedido? 
      Responda con SI o NO`;

      state.update({resumen})
      flowDynamic(resumen)
      gotoFlow(flujoResumenPedido, )
    }
  )
 
// .addAnswer(
//   `Si estas interesado en uno de los productos
//   escribe *quiero* e indica la cantidad y el producto deseado

//   *Ejemplo:*
//   Quiero 1 Monitor Samsung QTLXX color negro`, {capture: true}, async (ctx, { flowDynamic,gotoFlow, state }) => {
//     console.log('Contexto',ctx.body);
//   }, )

module.exports = {
  flowConsulta,
  flujoResumenPedido
  // flowUbicacion,
  // flowPedido
};
