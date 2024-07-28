const res = require("express/lib/response");
const User = require("../models/user.model");

//creating a new user

const createUser = async (req, res) => {
  try {
    const duplicate = await User.findOne({ email: req.body.email });
    if (duplicate) {
      return res.status(409).json({ message: "User already exists" });
    }

    if (
      !req.body.email ||
      !req.body.name ||
      !req.body.username ||
      !req.body.password
    ) {
      return res.status(400).json({ message: "Crucial user Info missing" });
    }
    // const bodyData = req.body;
    // console.log(req.body);
    // console.log(JSON.stringify(bodyData));
    // const hashPass = await bcrypt.hash(body.password, 10);
    // bodyData.password = hashPass;
    // console.log(bodyData);
    await User.create(req.body);
    res.status(200).json({ message: "User created succesfuly" });
    console.log("User added successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//updating user

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: "Could not find the user" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//deleting user

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Could not find the user" });
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getting users data

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//find user
const findUser = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//adding a product to fav
const addFavorite = async (req, res) => {
  const email = req.body.email;
  const id = req.body.id;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.favoriteProducts.includes(id)) {
      user.favoriteProducts.push(id);
      await user.save();
      return res.status(201).json(user.favoriteProducts);
    } else {
      return res.status(408).json(user.favoriteProducts);
    }
  } catch (error) {
    console.error("Error in addFavorite:", error.message);
    res.status(500).json({ message: error.message });
  }
};

//remove a favorite
const removeFavorite = async (req, res) => {
  const email = req.body.email;
  const id = req.body.id;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.favoriteProducts.includes(id)) {
      return res
        .status(201)
        .json({ message: "Product not in the favorites...." });
    } else {
      const userId = user._id;
      await User.findByIdAndUpdate(
        userId,
        { $pull: { favoriteProducts: id } },
        { new: true }
      );

      res.status(200).json(user.favoriteProducts);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//incrreasing count in fav
const increaseInFavorites = async (req, res) => {
  const email = req.body.email;
  const id = req.body.id;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.favoriteProducts.push(id);
    await user.save();
    return res.status(201).json(user.favoriteProducts);
  } catch (error) {
    console.error("Error in addFavorite:", error.message);
    res.status(500).json({ message: error.message });
  }
};

////reducing count in fav
const reduceInFavorites = async (req, res) => {
  const email = req.body.email;
  const id = req.body.id;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.favoriteProducts.indexOf(id);
    if (index !== -1) {
      user.favoriteProducts.splice(index, 1);
      await user.save();
      return res.status(200).json({ message: "Reduced one successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  findUser,
  addFavorite,
  removeFavorite,
  increaseInFavorites,
  reduceInFavorites,
};
