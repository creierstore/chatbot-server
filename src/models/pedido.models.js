const { DataTypes } = require("sequelize");
const sequelize = require("../database/database.js");

const Pedido = sequelize.define("pedidos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cliente: {
    type: DataTypes.STRING,
  },
  fechaPedido: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  direccionEnvio: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: "Pendiente",
  },
});

module.exports = Pedido;
