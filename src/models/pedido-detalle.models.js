const { DataTypes } = require("sequelize");
const sequelize = require("../database/database.js");

const PedidoDetalle = sequelize.define("pedido_detalles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  precioUnitario: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  precioTotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
});

module.exports = PedidoDetalle;
