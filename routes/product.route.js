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
  addImages,
} = require("../controllers/product.controller");

//getting all
router.get("/", getAllProducts);
router.get("/findbyid/:id", getSingleProducts);

//adding products
router.post("/", createProduct);

//updating products
router.put("/update/:id", updateProduct);

//deleting products
router.delete("/delete/:id", deleteProduct);

//fetch bulk
router.post("/bulk", fetchBulk);

//add images
router.post("/addImages", addImages);

module.exports = router;
