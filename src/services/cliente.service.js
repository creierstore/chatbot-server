const axios = require('axios');
require("dotenv").config();

const URL_API = process.env.URL_BASE;

const createCliente = async (data) => {
  try {
    const response = await axios.post(`${URL_API}/clientes`, data);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Error al crear el cliente');
    }
  } catch (error) {
    throw error;
  }
};


const getClienteByTelephone = async (data) => {

  // console.log('VALOR A SER BUSCADO',data);


  try {
  const response = await axios.get(`${URL_API}/clientes-phone/${data}`);
    // console.log("DEVUELTO",response);
    if (response.status === 200) {
      return response.data; // Aquí se supone que la respuesta contiene los datos del cliente encontrado
    } else if (response.status === 404) {
      return null;
    } else {
      console.log('ERROR ==>');
    }
  } catch (error) {
    console.log('Error ==>',error);
  }
};

module.exports = {
  createCliente,
  getClienteByTelephone
};
