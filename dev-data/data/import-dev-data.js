import fs from "fs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Tour from "../../models/tourModel.js";

dotenv.config({ path: "./.env" });

const DB = process.env.DATABASE.replace(
  "<db_username>",
  process.env.MONGO_USER,
).replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const tours = JSON.parse(fs.readFileSync(`./dev-data/data/tours-simple.json`, "utf-8"));

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
};

//delete all data from the collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
    importData();
} else if (process.argv[2] === "--delete") {
    deleteData();
}

console.log(process.argv);