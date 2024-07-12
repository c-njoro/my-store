const express = require("express");
const userRouter = express.Router();
const User = require("../models/user.model");
const {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
} = require("../controllers/user.controller");

//adding user
userRouter.post("/", createUser);

//updating user
userRouter.put("/:id", updateUser);

//deleting user
userRouter.delete("/:id", deleteUser);

//getting users
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getSingleUser);

module.exports = userRouter;
