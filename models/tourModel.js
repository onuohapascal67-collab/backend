import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: [100, "Characters must not be more than 100"]
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: true
  }
});

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;

