const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const Product = require("./models/product.model");
const productRoute = require("./routes/product.route");
const userRoute = require("./routes/user.route");
const cors = require("cors");

//the app and its usings, and also the router
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);

mongoose
  .connect("mongodb://localhost:27017/StoreDatabase")
  .then(() => {
    console.log("Connected to the database");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Error connecting to the database");
  });
