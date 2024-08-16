const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { type } = require("express/lib/response");
const User = require("../models/user.model");

const orderSchema = new Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  orderDate: { type: Date, default: Date.now },
  orderStatus: {
    type: String,
    enum: [
      "pending",
      "processing",
      "shipping",
      "shipped",
      "delivered",
      "cancelled",
      "returned",
    ],
    default: "pending",
  },

  customerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  shippingAddress: { type: String, required: true },
  contactInfo: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },

  paymentMethod: { type: String, required: true },
  paymentStatus: {
    type: String,
    enum: ["paid", "pending"],
    default: "pending",
  },
  transactionId: { type: String },
  totalAmount: { type: Number, required: true },

  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      productName: { type: String, required: true },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
      productOptions: { type: Object },
    },
  ],

  shippingMethod: { type: String, required: true },
  shippingCost: { type: Number, required: true },
  trackingNumber: { type: String, unique: true },

  taxRate: { type: Number },
  taxAmount: { type: Number },

  orderNotes: { type: String },
  internalNotes: { type: String },
});

orderSchema.pre("save", function (next) {
  if (!this.trackingNumber) {
    this.trackingNumber = generateUniqueTrackingNumber();
  }
  next();
});

function generateUniqueTrackingNumber() {
  // Generate a unique tracking number (e.g., using current timestamp and a random string)
  const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timestamp = Date.now().toString();
  return `TRK${timestamp}-${randomString}`;
}

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
