const Router = require("express");
const {
  getPedidos,
  // createPedido,
  updatePedido,
  deletePedido,
  getPedido,
  // buscarPedidoPorString
} = require("../controllers/pedidos.controller");

const router = Router();

router.get("/pedidos", getPedidos);
// router.post("/pedidos", createPedido);
router.put("/pedidos/:id", updatePedido);
router.delete("/pedidos/:id", deletePedido);
router.get("/pedidos/:id", getPedido);
// router.get("/pedidos/buscar/:q", buscarPedidoPorString);

module.exports = router;
