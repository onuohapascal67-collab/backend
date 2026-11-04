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






// ======================
// START SERVER
// ======================

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
