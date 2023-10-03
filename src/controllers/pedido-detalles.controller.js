
const sequelize  = require("../database/database");
const PedidoDetalle = require("../models/pedido-detalle.models");


const getPedidoDetalles = async (req, res) => {
  try {
    const data = await PedidoDetalle.findAll();
    // console.log(data);
    res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPedidoDetalle = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await PedidoDetalle.findOne({
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

// const createPedidoDetalle = async (req, res) => {
//   const { title, price, description, image, categoriaId } = req.body;

//   try {
//     const newData = await PedidoDetalle.create({
//       title,
//       price,
//       description,
//       image,
//       categoriaId,
//     });
    

//     // console.log({newPedidoDetalle});
//     res.json(newData);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

const updatePedidoDetalle = async (req, res) => {
  try {
    // console.log(req.params.id);

    const { id } = req.params;
    // const { title, price, description, image, categoriaId } = req.body;

    const data = await PedidoDetalle.findByPk(id);
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

const deletePedidoDetalle = async (req, res) => {
  try {
    // console.log(req.params.id);

    const { id } = req.params;
    await PedidoDetalle.destroy({
      where: {
        id,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// const buscarPedidoDetallePorString = async (req, res) => {
//   const searchString = req.params.q;

//   // console.log('valor buscado',searchString);

//   try {
//     const query = `
//       SELECT * FROM pedido_detalles WHERE LOWER(title) LIKE '${searchString.toLowerCase()}' OR LOWER(description) LIKE '${searchString.toLowerCase()}'
//     `;

//     const data = await sequelize.query(query, {
//       type: sequelize.QueryTypes.SELECT,
//     });
    

//     if (data.length === 0) {
//       return res.status(404).json({ message: "No se encontraron pedidodetalledetalles que coincidan con la búsqueda." });
//     }

//     res.json(data);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

module.exports = {
  getPedidoDetalles,
  getPedidoDetalle,
  // createPedidoDetalle,
  updatePedidoDetalle,
  deletePedidoDetalle,
  // buscarPedidoDetallePorString
};
