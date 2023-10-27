const { addKeyword } = require("@bot-whatsapp/bot");
const { flujoUbicacion } = require("./flujoUbicacion");
const { flujoEnvio, flujoMediosEntrega } = require("./flujoEnvio");
const { flujoDespedida } = require("./flujoDespedida");
const { flujoEncuesta } = require("./flujoEncuesta");
const { flujoRespuesta } = require("./flujoRespuesta");
const { flujoCarrito } = require("./flujoCarrito");

// Ubicacion
// Envio
// Despedida
// Respuesta


// FLujoS DE PAGO
// const flujoPagoOnline = addKeyword("online","Onlie","Onnline","Onilne","Onliine","Omline").addAnswer(
//   [
//     "Entro en flujoPagoOnline",
//     "Puedes pagar con el siguiente link: ",
//     "https://www.pagopar.com/pagos/ejemplo",
//   ],
//   null,
//   null,
//   []
// );



// const flujoEfectivo = addKeyword(["efectivo","Efectvo","Efecitvo","Efeectivo","Efectivoo","Efeftivo"]).addAnswer(
//   ["Ok, puedes abonar al momento de la entrega!"],
//   null,
//   null,
//   [flujoEnvio]
// );

const flujoEfectivo = addKeyword(["efectivo","Efectvo","Efecitvo","Efeectivo","Efectivoo","Efeftivo"]).addAnswer(
  ["Ok, puedes abonar al momento de la entrega!"],
  null, 
  async (ctx, {gotoFlow})=>{

  console.log('MESSAGE EFECTIVO', ctx.body);
  gotoFlow(flujoMediosEntrega);
  }
);

const flujoTransferencia = addKeyword(["transferencia",  "Trasferencia",  "Tranferencia",  "Transferenica",  "Transfernecia",  "Tranferenca"])
  .addAnswer(["Ok, te facilito mis datos bancarios"], {delay:1500})
  .addAnswer(
    `
  Estos son los Datos de Mi Cuenta Eko:
  Titular
  VERA SOLIS EDUARDO AUGUSTO
  
  Banco
  Familiar
  
  Nº de Teléfono
  +595973209691
  
  Nº de Cédula
  4064022
  
  N° de cuenta para transferencias desde Banco Familiar
  81-723821
  
  N° de cuenta para transferencias desde otros bancos
  81723821
  `, {delay:1500} )
  .addAnswer(["Aguardare el comprobante de transferecia!"], {delay:1500})
  .addAnswer(["Como le gustaria recibir su pedido, pasará a retirar del local o le enviamos por delivery"], {capture: true, delay:1500},
  async (ctx, {gotoFlow})=> {
    console.log('el mensaje es', ctx.body);
    // gotoFlow(flujoEnvio)
  }
  )
  ;


const flujoPagoShopify= addKeyword('Hola Edu, Este es mi pedido').addAnswer(
	"Muy buena elección, te gustaria pagar en efectivo, por transferencia bancaria?",
	null,
	null,
	[flujoEfectivo, flujoTransferencia]
);
  
const keywords = ["pagos", "pago", "pagar"];
const flujos = [
  flujoEfectivo, 
  flujoTransferencia, 
  flujoUbicacion, 
  flujoEnvio, 
  flujoDespedida, 
  flujoEncuesta, 
  flujoRespuesta, 
  flujoCarrito,
  flujoPagoShopify
];

const response = [
	"Disponemos de cobro en efectivo y por transferencia bancaria!", 
];

const flujoPagos = addKeyword(keywords).addAnswer(
	response,
	null,
	null,
	flujos
);

module.exports = {
	flujoPagos,
  flujoPagoShopify
};
