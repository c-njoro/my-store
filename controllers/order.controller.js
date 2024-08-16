const Order = require("../models/order.model");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});

    res.setHeader("Content-Range", `items 0-5/${orders.length - 1}`);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(200).json(order);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndUpdate(id, req.body);

    if (!order) {
      return res.status(404).json({ message: "Order could not be findeth" });
    }

    const updatedOrder = await Order.findById(id);

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ message: "Order could not be findeth" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getSingleOrder,
};
