const { sendPrompt, promptPedido } = require("../src/config/openai");

describe("sendPrompt", () => {
  it("debería retornar una respuesta válida en formato JSON", async () => {
    const prompt = promptPedido("Quiero un monitor Samsung HJ43");
    const response = await sendPrompt(prompt);
    
console.log("THE PROMPT:",prompt);
    // // Verifica que la respuesta no sea nula y contenga el campo 'choices'
    // expect(response).not.toBeNull();
    // // expect(response).toHaveProperty("choices");
    
    // // Verifica que el campo 'choices' sea un array no vacío
    // // expect(Array.isArray(response.choices)).toBeTruthy();
    // expect(response.choices.length).toBeGreaterThan(0);
    
    // // Verifica que la primera respuesta contenga el campo 'message' y 'content'
    // const firstChoice = response.choices[0];
    // // expect(firstChoice).toHaveProperty("message");
    // // expect(firstChoice.message).toHaveProperty("content");
    // expect(firstChoice.message.content).toHaveProperty("cantidad")
    // expect(firstChoice.message.content).toHaveProperty("nombre")
    console.log('RESPUESTA TEST',JSON.stringify(response,0,2), JSON.stringify(response.choices[0].message.content));
  });

//   it("debería manejar errores de API de OpenAI", async () => {
//     // Proporciona un prompt inválido para forzar un error
//     const prompt = "";
//     const response = await sendPrompt(prompt);

//     // Verifica que la respuesta sea nula y que haya un error en la consola
//     expect(response).toBeNull();
//     expect(console.error).toHaveBeenCalled(); // Asume que console.error fue llamado
//   });
});
