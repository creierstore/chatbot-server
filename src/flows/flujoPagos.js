const { addKeyword } = require("@bot-whatsapp/bot");
const { flujoUbicacion } = require("./flujoUbicacion");
const { flujoEnvio } = require("./flujoEnvio");
const { flujoDespedida } = require("./flujoDespedida");
const { flujoEncuesta } = require("./flujoEncuesta");
const { flujoRespuesta } = require("./flujoRespuesta");
const { flujoCarrito } = require("./flujoCarrito");

// Ubicacion
// Envio
// Despedida
// Respuesta


// FLOWS DE PAGO
const flowPagoOnline = addKeyword("online","Onlie","Onnline","Onilne","Onliine","Omline").addAnswer(
  [
    "Entro en flowPagoOnline",
    "Puedes pagar con el siguiente link: ",
    "https://www.pagopar.com/pagos/b66b96d645d47ea3db0dd9ce35f26ba578e4c6c20ec463599253da05bd1b443e",
  ],
  null,
  null,
  []
);

const flowEfectivo = addKeyword(["efectivo","Efectvo","Efecitvo","Efeectivo","Efectivoo","Efeftivo"]).addAnswer(
  ["Entro en flowEfectivo", "Ok, puedes abonar al momento de la entrega!"],
  null,
  null,
  []
);

const flowTransferencia = addKeyword(["transferencia",  "Trasferencia",  "Tranferencia",  "Transferenica",  "Transfernecia",  "Tranferenca"])
  .addAnswer(
    [
      "Ok, te facilito mis datos bancarios, aguardare tu comprobante de transferecia, gracias!",
    ],
    null,
    null
  )
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
  `,
    null,
    null,
    []
  );

  
const keywords = ["pagos", "pago", "pagar"];
const flujos = [
  flowPagoOnline, 
  flowEfectivo, 
  flowTransferencia, 
  flujoUbicacion, 
  flujoEnvio, 
  flujoDespedida, 
  flujoEncuesta, 
  flujoRespuesta, 
  flujoCarrito,
];

const response = [
	"Te gustaria pagar en efectivo, online o por transferencia bancaria?",
];

const flujoPagos = addKeyword(keywords).addAnswer(
	response,
	null,
	null,
	flujos
);


module.exports = {
	flujoPagos,
};
