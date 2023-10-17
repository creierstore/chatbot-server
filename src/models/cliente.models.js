const { DataTypes } = require("sequelize");
const sequelize = require("../database/database.js");
const Pedido = require("./pedido.models.js");

const Cliente = sequelize.define("clientes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  telephone: {
    type: DataTypes.STRING,
    unique: true
  }
});

Pedido.belongsTo(Cliente, { foreignKey: "clienteId" });
module.exports = Cliente;
