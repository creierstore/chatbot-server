const OpenAI = require("openai");
require('dotenv').config();

const openai = new OpenAI({
	organization: "org-8HNgXLh1aftCOwZTuCw1zggU",
	apiKey: process.env.OPENAI_API_KEY,
});

const promptProductos = (message)=> {
	
	return `
	Tengo una base de datos en PostgreSQL con una tabla llamada productos, 
	los nombres de los campos siempre estan en ingles, los campos son  title, idProduct, price, description, categoriaId, 
	teniendo en cuenta esto, identifica el producto deseado y las caracteristicas que se debe consultar en la BD y 
	genera una consulta SQL que responda a la siguiente pregunta:\n"${message}"\n\nConsulta SQL: 
	
	- Solo responde con la consulta sql, nada de explicaciones o descripciones
	- El contenido de la BD SIEMPRE estaran en español y los mensajes tambien
	- La consulta debe ser 'case insensitive'
	- este es el ejemplo de como es el contenido del campo Title en la BD: 'Monitor ACER h225 de 27" - Negro'
	- Indicame cuantos tokens de la API consumiria esta peticion
	`
}	

// const pedidoPrompt = promptProductos('Tienen monitores de la marca Samsung');

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
// console.log("SQLAZO",JSON.stringify(res.choices[0].message.content));


// });
// console.log('resultado',JSON.stringify(retornoPrompt, 0, 2));


module.exports = {
	sendPrompt,
	promptProductos
};
