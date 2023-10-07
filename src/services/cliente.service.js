const Cliente = require("../models/cliente.models");

const createCliente = async (data) => {
  console.log("DATA SERVICE", { data });
  try {
    const newData = await Cliente.create(data);
    return newData;
  } catch (error) {
    console.log(error.message);
  }
};

const getClienteByTelephone = async (data) => {
    console.log("DATA SERVICE", { data });
    try {
        const cliente = await Cliente.findOne({
          where: {
            telephone: data
          }
        });
        return cliente;
      } catch (error) {
        throw new Error("Error al buscar el cliente por número de teléfono");
      }
}

module.exports = {
  createCliente,
  getClienteByTelephone
};
