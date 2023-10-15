const express = require("express")
const productosRoutes = require('./src/routes/productos.routes')
const CategoriasRoutes = require('./src/routes/categorias.routes')
const ClientesRoutes = require('./src/routes/clientes.routes')
const PedidosRoutes = require('./src/routes/pedidos.routes')
const PedidosDetallesRoutes = require('./src/routes/pedido-detalles.routes')
const whatsappRoute = require('./src/routes/whatsapp.routes')

const { createBot, createProvider, createFlow, addKeyword} = require("@bot-whatsapp/bot");
const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
// const VenomProvider = require('@bot-whatsapp/provider/venom')
const MockAdapter = require("@bot-whatsapp/database/mock");
const axios = require("axios");

// // FLOWS DE CONVERSACION
// const { flowRecepcion }  = require("./src/flows/flowOrder");
// const { flowBienvenida } = require("./src/flows/flowWelcome");
// const { flowConsulta, flowUbicacion, flowBotones } = require("./src/flows/flowQuery");
// const { flowHablarVendedor } = require("./src/flows/flowAgent");
// const { flowEfectivo, flowPagoOnline, flowTransferencia } = require("./src/flows/flowPagos");

// const { flujoDespedida } = require("./src/flows/flujoDespedida");
// const { flujoRespuesta } = require("./src/flows/flujoRespuesta")
// const { flujoConsulta } = require("./src/flows/flujoConsulta")
// const { flujoPagos } = require("./src/flows/flujoPagos")
// const { flujoCarrito } = require("./src/flows/flujoCarrito")
// const { flujoEncuesta } = require("./src/flows/flujoEncuesta")
// const { flujoEnvio } = require("./src/flows/flujoEnvio")
// const { flujoPedido } = require("./src/flows/flujoPedido")
// const { flujoServicios } = require("./src/flows/flujoServicios")

// const { flujoUbicacion } = require("./src/flows/flujoUbicacion")
const { flujoSaludo } = require("./src/flows/flujoSaludo");

BASE_URL = "http://localhost:4000";
axios.defaults.baseURL = BASE_URL;

const axiosInstance = axios.create({
  baseUrl: BASE_URL,
  timeout: 1000,
});


const getProductos = async () => {
    return await axiosInstance.get("/productos");
  };
  let nombre;
  let apellidos;
  let telefono;
  
  
  const flowObtenerProductos = addKeyword(['productos'])
      .addAnswer(
          ['Claro, ¡voy a buscar los productos para ti!'],
          null,
          async (ctx, { flowDynamic, endFlow }) => {
              try {
                  const response = await axios.get('http://localhost:4000/productos');
                  const productos = response.data;
                  
                  if (productos.length === 0) {
                      return flowDynamic('Lo siento, no hay productos disponibles en este momento.');
                  } else {
                      // Aquí puedes formatear la lista de productos como desees
                      const formattedProductos = productos.map((producto, index) => {
                          return `${index + 1}. ${producto.title} - Precio: ${producto.price}`;
                      }).join('\n');
                      
                      return flowDynamic(`Aquí tienes algunos de nuestros productos:\n${formattedProductos}`);
                  }
              } catch (error) {
                  console.error(error);
                  return flowDynamic('Lo siento, hubo un error al obtener los productos. Por favor, inténtalo más tarde.');
              }
          }
      );
  
  
  const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow(
      [
        // flujoCarrito,
        // flujoConsulta,
        // flujoDespedida,
        // flujoEncuesta,
        // flujoEnvio,
        // flujoPagos,
        // flujoPedido,
        // flujoRespuesta,
        // flujoServicios,
        // flujoUbicacion,
        flujoSaludo,
      ]);
    const adapterProvider = createProvider(BaileysProvider);
  
    createBot({
      flow: adapterFlow,
      provider: adapterProvider,
      database: adapterDB,
    });
  
    QRPortalWeb();
  };
  
  main();
  

const app = express();
  app.use(express.json())

app.use(productosRoutes)
app.use(CategoriasRoutes)
app.use(PedidosRoutes)
app.use(PedidosDetallesRoutes)
app.use(ClientesRoutes)
app.use(whatsappRoute)



module.exports = app;
