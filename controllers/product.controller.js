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

    // Count occurrences of each ID
    const idCounts = ids.reduce((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});

    // Fetch unique products by ID
    const uniqueIds = Object.keys(idCounts);
    const products = await Product.find({ _id: { $in: uniqueIds } });

    // Create a map of product ID to product object
    const productMap = products.reduce((acc, product) => {
      acc[product._id.toString()] = product;
      return acc;
    }, {});

    // Build the result array including duplicates
    const result = ids
      .map((id) => productMap[id.toString()])
      .filter((product) => product !== undefined);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//adding images to a product
const addImages = async (req, res) => {
  const { id, images } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Add new images to the product's images array
    product.images = [...product.images, ...images];
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product images:", error);
    res.status(500).json({ message: "Failed to add images" });
  }
};

module.exports = {
  getAllProducts,
  getSingleProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchBulk,
  addImages,
};
