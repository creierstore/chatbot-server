const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  organization: "org-8HNgXLh1aftCOwZTuCw1zggU",
  apiKey: process.env.OPENAI_API_KEY,
});


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
};
