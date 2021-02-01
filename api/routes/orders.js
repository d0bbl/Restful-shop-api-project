const express = require("express");
const router = express.Router();
const orderCntrls = require("../cntrls/ordersCntrl");
const checkAuth = require("../../helpers/auth");

// get all orders
router.get("/orders", checkAuth, orderCntrls.get_Orders);

// place new orders
router.post("/orders", checkAuth, orderCntrls.post_Orders);

// get one order
router.get("/orders/:orderId", checkAuth, orderCntrls.get_Order);

// remove an order
router.delete("/orders/:orderId", checkAuth, orderCntrls.delete_Order);

module.exports = router;
