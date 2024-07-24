const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const {
  getAllProducts,
  getSingleProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchBulk,
} = require("../controllers/product.controller");

//getting all
router.get("/", getAllProducts);
router.get("/findbyid", getSingleProducts);

//adding products
router.post("/", createProduct);

//updating products
router.put("/update", updateProduct);

//deleting products
router.delete("/delete", deleteProduct);

//fetch bulk
router.post("/bulk", fetchBulk);

module.exports = router;
