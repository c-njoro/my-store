const express = require("express");
const orderRouter = express.Router();
const Order = require("../models/order.model");
const {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getSingleOrder,
} = require("../controllers/order.controller");

//get all orders
orderRouter.get("/", getAllOrders);

//getSingle Order
orderRouter.get("/findbyid/:id", getSingleOrder);

//create order
orderRouter.post("/", createOrder);

//update order
orderRouter.put("/update/:id", updateOrder);

//delete order
orderRouter.delete("/delete/:id", deleteOrder);

module.exports = orderRouter;
