const Producto = require("../models/producto.models");

const sequelize  = require("../database/database");


const getProductos = async (req, res) => {
  try {
    const data = await Producto.findAll();
    // console.log(data);
    res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Producto.findOne({
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

const createProducto = async (req, res) => {
  const { title, price, description, image, categoriaId } = req.body;

  try {
    const newData = await Producto.create({
      title,
      price,
      description,
      image,
      categoriaId,
    });
    

    // console.log({newProducto});
    res.json(newData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProducto = async (req, res) => {
  try {
    // console.log(req.params.id);

    const { id } = req.params;
    // const { title, price, description, image, categoriaId } = req.body;

    const data = await Producto.findByPk(id);
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

const deleteProducto = async (req, res) => {
  try {
    // console.log(req.params.id);

    const { id } = req.params;
    await Producto.destroy({
      where: {
        id,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const buscarProductoPorString = async (req, res) => {
  const searchString = req.params.q;

  // console.log('valor buscado',searchString);

  try {
    const query = `
      SELECT * FROM productos WHERE LOWER(title) LIKE '${searchString.toLowerCase()}' OR LOWER(description) LIKE '${searchString.toLowerCase()}'
    `;

    const data = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    

    if (data.length === 0) {
      return res.status(404).json({ message: "No se encontraron productos que coincidan con la búsqueda." });
    }

    res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProductos,
  getProducto,
  createProducto,
  updateProducto,
  deleteProducto,
  buscarProductoPorString
};
