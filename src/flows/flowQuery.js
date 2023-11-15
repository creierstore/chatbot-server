const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { sendPrompt } = require("../config/openai");
const {
  createCliente,
  getClienteByTelephone,
} = require("../services/cliente.service");
const { promptProductos, promptPedido, promptSeleccionProducto } = require("../prompts/prompts");
const { postCustomQuery } = require("../services/productos.service");
const { flujoPagos, flujoPagoShopify } = require("./flujoPagos");
const { flujoRespuesta } = require("./flujoRespuesta");

let PRODUCTOS = [];
let CLIENTE;

let PRODUCTO_DETALLE = {};
let PRODUCTO_SELECCIONADO = {};

const flujoResumenPedido = addKeyword([EVENTS.ACTION, "si", "no"]).addAnswer(
  "Confirma su pedido? Responda con SI o NO",
  { capture: true },
  async (ctx, { state, flowDynamic, gotoFlow, fallBack }) => {
    const myState = state.getMyState();
    console.log(myState);
    if (ctx.body.toLowerCase() === "si") {
      flowDynamic("Ok, procesamos tu pedido. Muchas gracias");
      gotoFlow(flujoPagoShopify);
    } else if (ctx.body.toLowerCase() === "no") {
      flowDynamic("Ok, de acuerdo, tiene alguna otra consulta?");
    } else {
      fallBack("Perdona, no te he entendido, responde con SI o NO");
    }
  }
);

const flowConsulta = addKeyword(["pregunta", "consulta"])
  .addAnswer(
    `Si, cual es tu consulta te mando un ejemplo de consulta:
- Tienen mouse de la marca Logitech`,
    // TODO: HACER CONSULTA A BASE DE DATOS
    { capture: true },
    async (ctx, { flowDynamic, gotoFlow, state }) => {
      // console.log('USER MESSAGE', ctx.body);
      const numeroDeWhatsapp = ctx.from;
      const mensajeRecibido = ctx.body;

      flowDynamic("Un momento por favor, voy a verificar!");
      try {
        const consultaSQL = await sendPrompt(promptProductos(mensajeRecibido));

        let sql = consultaSQL.choices[0].message.content;
        const respuestaBD = await postCustomQuery(sql);

        const productos = respuestaBD.data.data;
        // const objetoLimpio =  JSON.stringify(productos.slice(0,4),0,2);

        console.log(productos);

        PRODUCTOS = productos;
        await state.update({productos})
        for (const producto of productos) {
          const { title, price, image, link } = producto;
          const mensajeEnviar = `*${title}*
*Precio:* ${price}
*Enlace del producto:* ${link}`;

          await flowDynamic([
            {
              body: mensajeEnviar,
              media: image,
            },
          ]);
        }

        await flowDynamic([
          `Si estas interesado en uno de los productos 
escribe *quiero* e indica la cantidad y el producto deseado
  
*Ejemplo:*
Quiero 1 Mouse Logitech`,
          { delay: 2000 }
        ]);
      } catch (error) {
        flowDynamic("Disculpa ahora mismo no puedo responderte, por favor intente nuevamente en unos instantes.");
        return gotoFlow(flujoRespuesta)
        console.log(error.message);

      }
    }
  )
  .addAnswer("Te gustaria uno de estos productos?",
    { capture: true },
    async (ctx, { flowDynamic, gotoFlow, state }) => {
      console.log("Contexto", ctx.body);

      const mensajeUser = ctx.body;

      const cliente = await getClienteByTelephone(ctx.from);

      if(!cliente){
        CLIENTE = await createCliente({
          name: ctx.pushName,
          telephone: ctx.from,
        });
      }
      CLIENTE = cliente

      const estado= state.getMyState()
      
      const newProducts = estado.productos.map(producto => {
        return { id: producto.id, title: producto.title, price: producto.price }
      });
      
      const productosForGPT = JSON.stringify(newProducts);

      let laSeleccion = await sendPrompt(promptSeleccionProducto(mensajeUser, productosForGPT));
      
      const prodSeleccionado = JSON.parse(laSeleccion.choices[0].message.content);

      // TODO: SE TIENE QUE GUARDAR EL PEDIDO SEGUN LO QUE EL USUARIO PIDIO Y PREGUNTAR SI DESEA ALGO MAS

      PRODUCTO_DETALLE = prodSeleccionado

      console.log("PRODUCTO_DETALLE", PRODUCTO_DETALLE);
      
      const pedido = await sendPrompt(promptPedido(mensajeUser));
      console.log("PEDIDO", pedido.choices[0].message.content);

        PRODUCTO_SELECCIONADO = JSON.parse(pedido.choices[0].message.content);


        console.log(
          "EL CLIENTE ID ES:",
          CLIENTE.id,
          "LA CANTIDAD ES",
          PRODUCTO_SELECCIONADO.cantidad,
          "EL PRODUCTO_DETALLE ES:",
          PRODUCTO_SELECCIONADO.nombre
        );

        PRODUCTO_DETALLE.id;
        CLIENTE.id;
        PRODUCTO_SELECCIONADO.cantidad;
        PRODUCTO_SELECCIONADO.nombre;

      

      const resumen = `Su pedido es: 
      *Cant. | Producto | Precio*
      ${PRODUCTO_SELECCIONADO.cantidad}         | ${PRODUCTO_DETALLE[0].title} | ${
        PRODUCTO_DETALLE[0].price
      } 
            
      TOTAL: ${PRODUCTO_DETALLE[0].price * PRODUCTO_SELECCIONADO.cantidad} Gs.`;

      state.update({ resumen });
      flowDynamic(resumen);
      // gotoFlow(flujoResumenPedido);
    }
  )
  // .addAnswer(['Confirma su pedido? Responda con SI o NO'], {capture: true}, 
  // async (ctx, {flowDynamic, state, gotoFlow, fallBack})=>{
  
  //   console.log('MENSAJE DE CONFIRMACION ',ctx.body);

  //   if (ctx.body.toLowerCase() === "si") {
  //     flowDynamic("Ok, procesamos tu pedido. Muchas gracias");
  //     gotoFlow(flujoPagoShopify);
  //   } else if (ctx.body.toLowerCase() === "no") {
  //     flowDynamic("Ok, de acuerdo, tiene alguna otra consulta?");
  //   } else {
  //     fallBack("Perdona, no te he entendido, responde con SI o NO");
  //   }
  // })
  // ;

// .addAnswer(
//   `Si estas interesado en uno de los productos
//   escribe *quiero* e indica la cantidad y el producto deseado

//   *Ejemplo:*
//   Quiero 1 Monitor Samsung QTLXX color negro`, {capture: true}, async (ctx, { flowDynamic,gotoFlow, state }) => {
//     console.log('Contexto',ctx.body);
//   }, )

module.exports = {
  flowConsulta,
  flujoResumenPedido,
  // flowUbicacion,
  // flowPedido
};
