const express = require("express")
const productosRoutes = require('./src/routes/productos.routes')
const CategoriasRoutes = require('./src/routes/categorias.routes')

const { createBot, createProvider, createFlow, addKeyword} = require("@bot-whatsapp/bot");
const QRPortalWeb = require("@bot-whatsapp/portal");
// const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const VenomProvider = require('@bot-whatsapp/provider/venom')
const MockAdapter = require("@bot-whatsapp/database/mock");

// FLOWS DE CONVERSACION
const { flowInicio }  = require("./src/flows/flowOrder");
const { flowBienvenida } = require("./src/flows/flowWelcome");
const { flowConsulta } = require("./src/flows/flowQuery");
const { flowHablarVendedor } = require("./src/flows/flowAgent");

const axios = require("axios");

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
  
  
  const flowRecepcion = addKeyword([
    "Hola, este es mi pedido",
    "pedido",
  ]).addAnswer(
    [
      "Entro en flowRecepcion",
      "Hola, muy buena eleccion!",
      "Te gustaria pagar en efectivo, online o por transferencia bancaria?",
    ],
    null,
    async (ctx, {flowDynamic}) => {
      const mensajesDB = async () => {
        const products = await getProductos();
        return products
    }
    return flowDynamic(mensajesDB())
  },
    // [flowEfectivo, flowPagoOnline, flowTransferencia]
  )
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
  //   ['Hola!','Para enviar el formulario necesito unos datos...' ,'Escriba su *Nombre*'],
  //   { capture: true, buttons: [{ body: '❌ Cancelar solicitud' }] },
  
  //   async (ctx, { flowDynamic, endFlow }) => {
  //       if (ctx.body == '❌ Cancelar solicitud')
  //        return endFlow({body: '❌ Su solicitud ha sido cancelada ❌',    // Aquí terminamos el flow si la condicion se comple
  //            buttons:[{body:'⬅️ Volver al Inicio' }]                      // Y además, añadimos un botón por si necesitas derivarlo a otro flow
  
        
  //       })
  //       nombre = ctx.body
  //       return flowDynamic(`Encantado *${nombre}*, continuamos...`)
  //   }
  // )  
  
  const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow(
      [
        flowBienvenida, 
        flowConsulta, 
        flowHablarVendedor,
        flowInicio
      ]);
    const adapterProvider = createProvider(VenomProvider);
  
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

module.exports = app;
