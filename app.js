import express from "express";
import fs from "fs";
import morgan from "morgan"
import tourRouter from "./routes/tourRoutes.js"
import userRouter from "./routes/userRoutes.js"

const app = express();


// ======================
// MIDDLEWARES
// ======================

app.use(express.static("public"));

app.use(morgan("dev"));

app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ======================
// MOUNT ROUTERS
// ======================

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);




export default app