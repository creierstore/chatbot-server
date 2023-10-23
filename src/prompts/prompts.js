const promptIntencion = (message) => {
  return `
    Teniendo en cuenta estos flujos:
    - flujoSaludo
    - flujoConsulta
    - flujoDespedida
    - flujoPedido
    - flujoPagos
    - flujoRecomendacion (para productos)
    - flujoServicios (se refiere a problemas tecnicos)
    Detecta a cuál de estos flujos debería ir el usuario después de escribir:
    "${message}"
    SOLO harás esa única cosa. NO proporciones explicaciones o detalles, 
    SOLO devuelve el nombre del flujo que mejor responda  a la pregunta
    `;
};

const promptPedido = (message) => {
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
    `;
};

const promptProductos = (message) => {
  return `
    Tengo una BD Postgres. En la BD una tabla llamada "productos". 
    Los campos siempre estan en inglés, los mismos son "title", "idProduct", "price", "description" y categoriaId.
    Recibirás un mensaje de pedido o consulta. Ejemplo: <<Tienes monitores>>, o <<Quiero un mouse de la marca X>>, 
    o <<Tienen monitores X>> o <<Tienen X>> DONDE X e Y son marca o producto respectivamente.
    En base a lo mencionado anteriormente. 
    Escribe una consulta SQL que responda a la siguiente pregunta: "${message}"
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

module.exports = {
  promptIntencion,
  promptPedido,
  promptProductos,
};
