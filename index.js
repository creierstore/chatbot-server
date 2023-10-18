const {app, main} = require("./app.js");
require("dotenv").config();

const PORT = process.env.PORT || 8200;

async function start() {
  try {
    console.log("Connection has been established successfully.");
    app.listen(PORT);
    await main();
    console.log("Server is listening on port", PORT);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

start();
