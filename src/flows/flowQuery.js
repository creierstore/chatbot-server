const { addKeyword } = require("@bot-whatsapp/bot");
const { sendPrompt} = require("../config/openai");
const { createCliente, getClienteByTelephone} = require("../services/cliente.service");
// const { searchProducto } = require("../services/producto.service");

// const { createPedido } = require('../controllers/pedidos.controller');
const { promptProductos, promptPedido } = require("../prompts/prompts");

let PRODUCTOS = [];
let USERDATA = [];
let CLIENTE = {};

let PRODUCTO_DETALLE = {};
let PRODUCTO_SELECCIONADO = {};

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
  `Si, cual es tu consulta
    Este es un ejemplo de pregunta:
    - Tienen monitores de la marca Samsung`,
    // TODO: HACER CONSULTA A BASE DE DATOS
    { capture: true },
    async (ctx, { flowDynamic, gotoFlow, state }) => {
      // console.log('USER MESSAGE', ctx.body);
      const numeroDeWhatsapp = ctx.from;
      const mensajeRecibido = ctx.body;

      USERDATA = ctx;
      console.log("Data to Save", USERDATA, USERDATA.from, USERDATA.pushName);

      const saveUserData = await createCliente({
        // name : ctx.sender.name,
        name: ctx.pushName,
        telephone: ctx.from,
      });

      CLIENTE = (await getClienteByTelephone(USERDATA.from)).dataValues;

      console.log("CLIENTE ENCONTRADO", CLIENTE);

      console.log("DATOS A SER GUARDADOS", saveUserData);

      flowDynamic("Un momento por favor, voy a verificar!");
      try {
        const consultaSQL = await sendPrompt(promptProductos(mensajeRecibido));
        // console.log('valorSQL', consultaSQL.choices[0].message.content);

        let sql = consultaSQL.choices[0].message.content;

        const respuestaBD = await sequelize.query(sql);

        // console.log(respuestaBD);
        // const objetoLimpio =  JSON.stringify(respuestaBD[0].slice(0,4),0,2);

        const productos = respuestaBD[0].slice(0, 5);

        PRODUCTOS = productos;

        for (const producto of productos) {
          const { title, price } = producto;
          // console.log(`Título: ${title}, Precio: ${price}`);
          const mensajeEnviar = `*${title}*, *Precio:* ${price}`;
          flowDynamic(mensajeEnviar);
        }
      } catch (error) {
        flowDynamic("Disculpa ahora mismo no puedo responderte");
        console.log(error.message);
      }
    }
  )
  .addAnswer(
    `Si estas interesado en uno de los productos 
escribe *quiero* e indica la cantidad y el producto deseado
 
*Ejemplo:*
_Quiero 1 Monitor Samsung QTLXX color negro_`,
    { capture: true },
    async (ctx, { flowDynamic, gotoFlow, state }) => {
      console.log("Contexto", ctx.body);

      const mensajeUser = ctx.body;

      let SQLPRODUCTO = await sendPrompt(promptProductos(mensajeUser));

      const productoVerificado = await sequelize.query(
        SQLPRODUCTO.choices[0].message.content
      );

      // console.log('EL PRODUCTO VERIFICADO ES',productoVerificado);

      PRODUCTO_DETALLE = productoVerificado[0];

      console.log("PRODUCTO_DETALLE", PRODUCTO_DETALLE);

      if (PRODUCTOS.length == 1) {
        // CASO ECONOMICO

        const pedido = await sendPrompt(promptPedido(mensajeUser));
        console.log("PEDIDO", pedido);
        console.log(
          "entro en caso economico",
          PRODUCTOS[0].id,
          PRODUCTOS[0].title
        );
        console.log("CLIENTE ID", CLIENTE.id);
      } else {
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

        // const productoPedido = await searchProducto(productoSeleccionado.nombre)

        // console.log('EL PRODUCTO PEDIDO',productoPedido);
        PRODUCTO_DETALLE.id;
        CLIENTE.id;
        PRODUCTO_SELECCIONADO.cantidad;
        PRODUCTO_SELECCIONADO.nombre;

        // const clienteData = { id: CLIENTE.id };
        // const pedidoData = { direccionEnvio: 'definir ubicacion', estado: 'Pendiente' };
        // const detallesData = [
        //   { id: PRODUCTO_DETALLE[0].id,cantidad: PRODUCTO_SELECCIONADO.cantidad, precioUnitario: PRODUCTO_DETALLE[0].price, precioTotal: PRODUCTO_DETALLE[0].price *  PRODUCTO_SELECCIONADO.cantidad},
        // ];

        // await createPedido(clienteData, pedidoData, detallesData);


      }

      // TODO manejar pedido con chatgpt, generar una consulta a base de datos otra vez
      // En base a la consulta guardar pedido en base de datos. ->> Flow ubicacion, o forma de pago, o generar link con
      // shopify api para pagar en la web de shopify.

      sendPrompt(`Recibiras un pedido de un producto. `);
      // flowDynamic(`Su pedido es: ${ctx.body}. Confirma su pedido?`);
      flowDynamic(
`Su pedido es: 
*Cant. | Producto | Precio*
${PRODUCTO_SELECCIONADO.cantidad}         | ${PRODUCTO_DETALLE[0].title} | ${PRODUCTO_DETALLE[0].price} 
      
TOTAL: ${PRODUCTO_DETALLE[0].price * PRODUCTO_SELECCIONADO.cantidad} Gs.
      
Confirma su pedido?`
      );
    }
  );
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
