const { DataTypes } = require("sequelize");
const sequelize = require("../database/database.js");
const PedidoDetalle = require("./pedido-detalle.models.js");

const Pedido = sequelize.define("pedidos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  direccionEnvio: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: "Pendiente",
  },
  clienteId: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

Pedido.hasMany(PedidoDetalle, { as: "detalles", foreignKey: "pedidoId" });
PedidoDetalle.belongsTo(Pedido, { foreignKey: "pedidoId" });


module.exports = Pedido;
