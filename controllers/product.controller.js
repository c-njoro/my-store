const Product = require("../models/product.model");

//about getting products data
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//about creating new products
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//about updating existing products
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { reviews } = req.body;

    if (reviews) {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $push: { reviews: { $each: reviews } } },
        { new: true, useFindAndModify: false }
      );

      return res.status(200).json(updatedProduct);
    }

    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Product could not be findeth" });
    }

    const updatedProduct = await Product.findById(id);

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//about deleting a product

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product could not be findeth" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchBulk = async (req, res) => {
  const { ids } = req.body;

  try {
    if (!Array.isArray(ids)) {
      return res
        .status(400)
        .json({ message: "Invalid request: ids should be an array" });
    }

    const products = await Product.find({ _id: { $in: ids } });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getSingleProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchBulk,
};
