const Pedido = require("../models/pedido.models");
const sequelize  = require("../database/database");


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

const createPedido = async (req, res) => {
  const { cliente, fechaPedido, direccionEnvio, estado, } = req.body;

  try {
    const newData = await Pedido.create({
      cliente,
      fechaPedido,
      direccionEnvio,
      estado,
    });
    

    // console.log({newPedido});
    res.json(newData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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

// const buscarPedidoPorString = async (req, res) => {
//   const searchString = req.params.q;

//   // console.log('valor buscado',searchString);

//   try {
//     const query = `
//       SELECT * FROM pedidos WHERE LOWER(title) LIKE '${searchString.toLowerCase()}' OR LOWER(description) LIKE '${searchString.toLowerCase()}'
//     `;

//     const data = await sequelize.query(query, {
//       type: sequelize.QueryTypes.SELECT,
//     });
    

//     if (data.length === 0) {
//       return res.status(404).json({ message: "No se encontraron pedidos que coincidan con la búsqueda." });
//     }

//     res.json(data);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

module.exports = {
  getPedidos,
  getPedido,
  createPedido,
  updatePedido,
  deletePedido,
  // buscarPedidoPorString
};
