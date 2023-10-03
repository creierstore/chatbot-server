const Router = require("express");
const {
  getPedidoDetalles,
  // createPedidoDetalle,
  updatePedidoDetalle,
  deletePedidoDetalle,
  getPedidoDetalle,
  // buscarPedidoDetallePorString
} = require("../controllers/pedido-detalles.controller");

const router = Router();

router.get("/pedido-detalles", getPedidoDetalles);
// router.post("/pedido-detalles", createPedidoDetalle);
router.put("/pedido-detalles/:id", updatePedidoDetalle);
router.delete("/pedido-detalles/:id", deletePedidoDetalle);
router.get("/pedido-detalles/:id", getPedidoDetalle);
// router.get("/pedido-detalles/buscar/:q", buscarPedidoDetallePorString);

module.exports = router;
