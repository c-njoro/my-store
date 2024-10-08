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
  removeFavorite,
  increaseInFavorites,
  reduceInFavorites,
} = require("../controllers/user.controller");

//adding user
// userRouter.post("/", upload.single("profilePicture"), createUser);
userRouter.post("/", createUser);

//updating user
userRouter.put("/update/:id", updateUser);

//deleting user
userRouter.delete("/delete/:id", deleteUser);

//getting users
userRouter.get("/", getAllUsers);
userRouter.get("/findById/:id", getSingleUser);

//finding one
userRouter.get("/find", findUser);

//addingFavorite
userRouter.put("/addFavorite", addFavorite);

//remove from favorites
userRouter.post("/removeFavorite", removeFavorite);

//increase favorite
userRouter.put("/increaseFavorite", increaseInFavorites);

//reduce in favorites
userRouter.post("/reduceFavorite", reduceInFavorites);

module.exports = userRouter;
