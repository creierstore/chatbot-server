const express = require("express")
const productosRoutes = require('./routes/productos.routes')
const CategoriasRoutes = require('./routes/categorias.routes')


const app = express();
app.use(express.json())

app.use(productosRoutes)
app.use(CategoriasRoutes)

module.exports = app;
