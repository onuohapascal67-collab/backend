import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    maxlength: [50, "Characters must not be more than 50"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: [8, "Password must be at least 8 characters long"],
  },
});

const User = mongoose.model("User", userSchema);



export default User;
