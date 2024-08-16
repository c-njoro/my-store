const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const Product = require("./models/product.model");
const productRoute = require("./routes/product.route");
const userRoute = require("./routes/user.route");
const orderRoute = require("./routes/order.route");
const uploadRouter = require("./upload.route");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const bodyParser = require("body-parser");

//the app and its usings, and also the router
const app = express();
app.use(express.json());
app.use(
  cors({
    exposedHeaders: ["Content-Range"],
  })
);
app.use(express.urlencoded({ extended: false }));
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/", uploadRouter);
app.use(bodyParser.json()); // For JSON payloads
app.use(bodyParser.urlencoded({ extended: true }));

//make uploaded images available
app.use("/uploader", express.static(__dirname + "/uploads"));
app.use("/productImages", express.static(__dirname + "/productImages"));

mongoose
  .connect(`${process.env.LOCAL_KEY}`)
  .then(() => {
    console.log("Connected to the database");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Error connecting to the database");
  });
