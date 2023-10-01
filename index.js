const app = require("./app.js");
const sequelize = require("./src/database/database.js");
// const Producto = require("./models/producto.js")
// const Categoria = require("./models/categoria.js")

async function main() {
  try {
    await sequelize .sync();
    // await sequelize.sync({force: true});
    console.log("Connection has been established successfully.");
    app.listen(4000);
    console.log("Server is listening on port", 4000);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
