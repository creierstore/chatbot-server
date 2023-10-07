const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  organization: "org-8HNgXLh1aftCOwZTuCw1zggU",
  apiKey: process.env.OPENAI_API_KEY,
});

const promptPedido = (message)=> {

	return `
  Al final de este mensaje habrá un string con un pedido de producto
Tu trabajo es extraer el nombre y la cantidad.
Devolverás un objeto en formato JSON con esas propiedades.
Ejemplo: Quiero un monitor samsung HNX30 de 32"
Tú, devolverás
{cantidad: 1, nombre: "Monitor Samsung HNX30"}

SOLO harás esa única cosa. NO proporciones explicaciones o detalles, solo devuelve el objeto.
No digas Entendido, o aqui tienes, de hecho no digas nada. RECUERDA, solo responde con el objeto JSON
  "${message}"
	`
}

const promptProductos = (message) => {
  return `
	Tengo una BD Postgres. En la BD una tabla llamada "productos". 
	Los campos siempre estan en inglés, los mismos son "title", "idProduct", "price", "description" y categoriaId.
	Recibirás un mensaje de pedido o consulta. Ejemplo: <<Tienes monitores>>, o <<Quiero un mouse de la marca X>>, o <<Tienen monitores X>> o <<Tienen X>> DONDE X e Y son marca o producto respectivamente.
	En base a lo mencionado anteriormente. Escribe una consulta SQL que responda a la siguiente pregunta: "${message}"
	Donde message, es el mensaje que vas a recibir.
	No se te permite dar descripciones o explicaciones. Debes retornar directamente la consulta SQL SIEMPRE.
	Tu trabajo es solo hacer consultas SQL, no te salgas NUNCA del papel
	El contenido de la BD SIEMPRE estaran en español y los mensajes tambien.
	La consulta debe ser 'case insensitive'.
  Utiliza la funcion LOWER de sql SIEMPRE.
	Los productos deben buscarse en singular
  Utiliza la funcion LIKE para tus consultas SQL.
	`;
};

// const pedidoPrompt = promptPedido('Quiero 1 monitor Samsung s750');

/**
 * Recibe un prompt y retorna la respuesta de openai.
 * El modelo usa gpt-3.5-turbo.
 *
 * @param {string} prompt
 * @returns
 */

const sendPrompt = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      // model: "gpt-4",
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 50, // Ajusta este valor según tus necesidades
      stop: "\n", // Detiene la respuesta en un salto de línea
    });
    return response;
  } catch (error) {
    console.error("Error al interactuar con la API de OpenAI:", error);
  }
};

// let retornoPrompt = sendPrompt(pedidoPrompt).then(res =>{
// console.log("VALOR DEL RES",JSON.stringify(res, 0, 2));
// console.log("SQL",JSON.stringify(res.choices[0].message.content));

// });
// console.log('resultado',JSON.stringify(retornoPrompt, 0, 2));

module.exports = {
  sendPrompt,
  promptProductos,
  promptPedido
};
