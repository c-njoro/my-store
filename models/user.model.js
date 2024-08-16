const mongoose = require("mongoose");
const { type } = require("express/lib/response");
const Product = require("./product.model");
const Order = require("../models/order.model");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateUpdated: {
    type: Date,
    default: Date.now,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  favoriteProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
