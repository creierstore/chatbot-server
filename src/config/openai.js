const OpenAI = require("openai");


const openai = new OpenAI({
	organization: "org-8HNgXLh1aftCOwZTuCw1zggU",
	apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Recibe un prompt y retorna la respuesta de openai.
 * El modelo usa gpt-3.5-turbo.
 * 
 * @param {string} prompt 
 * @returns 
 */
const sendPrompt = async (prompt = "Hola, como estas?") => {
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

module.exports = sendPrompt;
