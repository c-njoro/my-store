const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const {
  getAllProducts,
  getSingleProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

//getting all
router.get("/", getAllProducts);
router.get("/:id", getSingleProducts);

//adding products
router.post("/", createProduct);

//updating products
router.put("/:id", updateProduct);

//deleting products
router.delete("/:id", deleteProduct);

module.exports = router;
