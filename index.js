const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const Product = require("./models/product.model");
const productRoute = require("./routes/product.route");
const userRoute = require("./routes/user.route");

//the app and its usings, and also the router
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);

mongoose
  .connect(`${process.env.DB_KEY}`)
  .then(() => {
    console.log("Connected to the database");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Error connecting to the database");
  });
