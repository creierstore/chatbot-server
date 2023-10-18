const app = require("./app.js");
require("dotenv").config();

const PORT = 8100;

async function main() {
  try {
    console.log("Connection has been established successfully.");
    app.listen(PORT);
    console.log("Server is listening on port", PORT);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
