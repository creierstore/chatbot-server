const Router = require("express");
const {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
  getCliente,
} = require("../controllers/clientes.controller");

const router = Router();

router.get("/clientes", getClientes);
router.post("/clientes", createCliente);
router.put("/clientes/:id", updateCliente);
router.delete("/clientes/:id", deleteCliente);
router.get("/clientes/:id", getCliente);

module.exports = router;
