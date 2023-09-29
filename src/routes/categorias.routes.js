const Router = require("express");
const {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
  getCategoria,
  getCategoriaProductos
} = require("../controllers/categorias.controller");

const router = Router();

router.get("/categorias", getCategorias);
router.post("/categorias", createCategoria);
router.put("/categorias/:id", updateCategoria);
router.delete("/categorias/:id", deleteCategoria);
router.get("/categorias/:id", getCategoria);

router.get("/categorias/:id/productos", getCategoriaProductos);

module.exports = router;
