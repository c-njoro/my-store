const mongoose = require("mongoose");
const { type } = require("express/lib/response");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name of product"],
  },
  description: {
    type: String,
    required: [true, "Please enter description of product"],
  },
  price: {
    type: Number,
    required: [true, "Please enter price of product"],
  },
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter name of product"],
    enum: {
      values: [
        "Electronics",
        "Cameras",
        "Laptops",
        "Accessories",
        "Headphones",
        "Sports",
      ],
      message: "Please select correct product category",
    },
  },
  seller: {
    type: String,
    required: [true, "Please enter the seller of product"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter stock of available products"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
