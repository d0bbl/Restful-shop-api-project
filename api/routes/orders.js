const express = require("express");
const router = express.Router();
const orderCntrls = require("../cntrls/ordersCntrl");

// get all orders
router.get("/orders", orderCntrls.get_Orders);

// place new orders
router.post("/orders", orderCntrls.post_Orders);

// get one order
router.get("/orders/:orderId", orderCntrls.get_Order);

// remove an order
router.delete("/orders/:orderId", orderCntrls.delete_Order);

module.exports = router;
