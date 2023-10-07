const Producto = require("../models/producto.models");

const searchProducto = async (data) => {
    console.log("DATA SERVICE", { data });

  try {
    const producto = await Producto.findOne({
      where: {
        title: title,
      },
    });
    return producto;
  } catch (error) {
    throw new Error("Error al buscar el producto por nombre");
  }
};

module.exports = {
  searchProducto,
};
