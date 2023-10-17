const Pedido = require("../models/pedido.models");
const Cliente = require("../models/cliente.models");
const PedidoDetalle = require("../models/pedido-detalle.models");
const sequelize = require("../database/database");

const getPedidos = async (req, res) => {
  try {
    const data = await Pedido.findAll();
    // console.log(data);
    res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPedido = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Pedido.findOne({
      where: {
        id,
      },
    });
    if (!data) {
      return res.status(404).json({ message: "No se encontro!" });
    }
    res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createPedido = async (clienteData, pedidoData, detallesData) => {
  let transaction = await sequelize.transaction();
  // const { cliente, fechaPedido, direccionEnvio, estado, } = req.body;

  try {
    console.log('VALORES TO SAVE PEDIDO',clienteData, pedidoData, detallesData);
    pedidoData.clienteId = clienteData.id; // Asigna el clienteId al pedidoData
    const pedido = await Pedido.create(pedidoData, { transaction });

    // Asigna el pedidoId a cada detalle y luego inserta los detalles
    detallesData.forEach((detalle) => {
      detalle.pedidoId = pedido.id;
    });
    await PedidoDetalle.bulkCreate(detallesData, { transaction });

    // Confirma la transacción
    await transaction.commit();

    //  res.json({pedido, cliente});
    return { pedido, cliente }; // Retorna el pedido y e
  } catch (error) {
    // Si ocurre algún error, realiza un rollback de la transacción
    if (transaction) {
      await transaction.rollback();
    }
    throw error;
    // return res.status(500).json({ message: error.message });
  }
};

const updatePedido = async (req, res) => {
  try {
    // console.log(req.params.id);

    const { id } = req.params;
    // const { title, price, description, image, categoriaId } = req.body;

    const data = await Pedido.findByPk(id);
    data.set(req.body);

    // data.title = title;
    // data.price = price;
    // data.description = description;
    // data.image = image;
    // data.categoriaId = categoriaId;

    await data.save();
    res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePedido = async (req, res) => {
  try {
    // console.log(req.params.id);

    const { id } = req.params;
    await Pedido.destroy({
      where: {
        id,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPedidos,
  getPedido,
  createPedido,
  updatePedido,
  deletePedido,
};
