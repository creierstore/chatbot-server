const { DataTypes } = require("sequelize");
const sequelize = require("../database/database.js");
const Producto = require("./pedido.models.js");

const Categoria = sequelize.define("categorias", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  idCustom: {
    type: DataTypes.FLOAT,
  },
  image: {
    type: DataTypes.STRING,
  },
});

Categoria.hasMany(Producto, {
  foreignKey: "categoriaId",
  sourceKey: "id",
});

Producto.belongsTo(Categoria, {
  foreignKey: "categoriaId",
  targetId: "id",
});

module.exports = Categoria;
