const Categoria = require("../models/categoria");
const Producto = require("../models/producto");

const getCategorias = async (req, res) => {
  try {
    const data = await Categoria.findAll();
    // console.log(data);
    res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Categoria.findOne({
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

const createCategoria = async (req, res) => {
  const { title, idCustom, image } = req.body;

  try {
    const newData = await Categoria.create({
      title,
      idCustom,
      image,
    });
    // console.log({newCategoria});
    res.json(newData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateCategoria = async (req, res) => {
  try {
    console.log(req.params.id);

    const { id } = req.params;
    const { title, idCustom, image } = req.body;

    const data = await Categoria.findByPk(id);

    data.title = title;
    data.idCustom = idCustom;
    data.image = image;
    await data.save();
    res.json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteCategoria = async (req, res) => {
  try {
    console.log(req.params.id);

    const { id } = req.params;
    await Categoria.destroy({
      where: {
        id,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCategoriaProductos = async (req, res) => {
  const { id } = req.params;

  const productos = await Producto.findAll({
    where: {
      categoriaId: id,
    }
  });

  res.json(productos)
};



module.exports = {
  getCategorias,
  getCategoria,
  createCategoria,
  updateCategoria,
  deleteCategoria,
  getCategoriaProductos,
};
