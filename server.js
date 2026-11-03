import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./.env" });

const DB = process.env.DATABASE
    .replace("<db_username>", process.env.MONGO_USER)
    .replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.log(err);
    });


const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Tour must have a name"],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "Tour must have a price"]
  },
});

const Tour = mongoose.model("Tour", tourSchema);

const testTour = new Tour({
  name: "The Forest Hiker",
  rating: 4.7,
  price: 497
});

testTour.save().then(doc => {
  console.log(doc);
}).catch(err => {
  console.log(err);
})

// ======================
// START SERVER
// ======================

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
