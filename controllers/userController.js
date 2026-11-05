import User from "../models/userModel.js";


// ---------- USERS ----------

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      data: users
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error fetching users",
      error: err
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found"
      });
    }
    res.status(200).json({
      status: "success",
      data: user
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error fetching user",
      error: err
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data: user
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error creating user",
      error: err
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found"
      });
    }
    res.status(200).json({
      status: "success",
      data: user
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error updating user",
      error: err
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found"
      });
    }
    res.status(200).json({
      status: "success",
      data: user
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error deleting user",
      error: err
    });
  }
};


// Create a user
// const testUser = new User({
//   name: "John Doe",
//   email: "john@example.com",
//   password: "password123",
// });

// testUser
//   .save()
//   .then((doc) => {
//     console.log("User created:", doc);
//   })
//   .catch((err) => {
//     console.error("Error creating user:", err);
//   });