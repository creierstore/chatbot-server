const { DataTypes } = require("sequelize");
const sequelize = require("../database/database.js");

const Producto = sequelize.define("productos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },  
  idProduct: {
    type: DataTypes.FLOAT,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  description: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
  },
  link: {
    type: DataTypes.STRING,
  },
});

module.exports = Producto;

