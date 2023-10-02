const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  organization: "org-8HNgXLh1aftCOwZTuCw1zggU",
  apiKey: process.env.OPENAI_API_KEY,
});

// const promptProductos = (message)=> {

// 	return `
// 	Tengo una base de datos en PostgreSQL con una tabla llamada productos,
// 	los nombres de los campos siempre estan en ingles, los campos son  title, idProduct, price, description, categoriaId,
// 	teniendo en cuenta esto, identifica el producto deseado y las caracteristicas que se debe consultar en la BD y
// 	genera una consulta SQL que responda a la siguiente pregunta:\n"${message}"\n\nConsulta SQL:

// 	- Solo responde con la consulta sql, nada de explicaciones o descripciones
// 	- El contenido de la BD SIEMPRE estaran en español y los mensajes tambien
// 	- La consulta debe ser 'case insensitive'
// 	- este es el ejemplo de como es el contenido del campo Title en la BD: 'Monitor ACER h225 de 27" - Negro'
// 	- Indicame cuantos tokens de la API consumiria esta peticion
// 	`
// }

const promptProductos = (message) => {
  return `
	Tengo una BD Postgres. En la BD una tabla llamada "productos". 
	Los campos siempre estan en inglés, los mismos son "title", "idProduct", "price", "description" y categoriaId.
	Recibirás un mensaje de pedido o consulta. Ejemplo: <<Tienes monitores>>, o <<Quiero un mouse de la marca X>>, o <<Tienen monitores X>> o <<Tienen X>> DONDE X e Y son marca o producto respectivamente.
	En base a lo mencionado anteriormente. Escribe una consulta SQL que responda a la siguiente pregunta: "${message}"
	Donde message, es el mensaje que vas a recibir.
	No se te permite dar descripciones o explicaciones. Debes retornar directamente la consulta SQL SIEMPRE.
	Tu trabajo es solo hacer consultas SQL, no te salgas NUNCA del papel
	El contenido de la BD SIEMPRE estaran en español y los mensajes tambien
	La consulta debe ser 'case insensitive'
	Los productos deben buscarse en singular
	`;
};

// const pedidoPrompt = promptProductos('Tienen monitores');

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
      model: "gpt-4",
      // model: "gpt-3.5-turbo",
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
// console.log("SQLAZO",JSON.stringify(res.choices[0].message.content));

// });
// console.log('resultado',JSON.stringify(retornoPrompt, 0, 2));

module.exports = {
  sendPrompt,
  promptProductos,
};
