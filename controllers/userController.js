import User from "../models/userModel.js";


// ---------- USERS ----------

export const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

export const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

export const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

export const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

export const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
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