const Cliente = require("../models/cliente.models");

const getClientes = async (req, res) => {
  try {
    const data = await Cliente.findAll();
    // console.log(data);
    res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Cliente.findOne({
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

const createCliente = async (req, res) => {
  const { name, telephone } = req.body;

  try {
    const newData = await Cliente.create({
      name,
      telephone,
    });
    // console.log({newCliente});
    res.json(newData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateCliente = async (req, res) => {
  try {
    // console.log(req.params.id);

    const { id } = req.params;

    const data = await Cliente.findByPk(id);
    data.set(req.body);
    
    await data.save();
    res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteCliente = async (req, res) => {
  try {
    console.log(req.params.id);

    const { id } = req.params;
    await Cliente.destroy({
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
  getClientes,
  getCliente,
  createCliente,
  updateCliente,
  deleteCliente,
};
