const express = require("express");
const userRouter = express.Router();
const User = require("../models/user.model");
const {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  findUser,
  addFavorite,
} = require("../controllers/user.controller");
const { findOne } = require("../models/product.model");

//adding user
userRouter.post("/", createUser);

//updating user
userRouter.put("/updateUser/:id", updateUser);

//deleting user
userRouter.delete("/deleteUser", deleteUser);

//getting users
userRouter.get("/", getAllUsers);
// userRouter.get("/findById", getSingleUser);

//finding one
userRouter.get("/find", findUser);

//addingFavorite
userRouter.put("/addFavorite", addFavorite);

module.exports = userRouter;
