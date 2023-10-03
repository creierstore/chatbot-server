const Cliente = require("../models/cliente.models");

const createCliente = async (data) => {
    console.log('DATA SERVICE', {data});
try {
    const newData = await Cliente.create(data)
    return newData;
} catch (error) {
    console.log(error.message);
}

  };


module.exports = {
createCliente
}
  