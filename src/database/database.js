const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("chatbot", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
  port: '5434'
});

module.exports = sequelize;
