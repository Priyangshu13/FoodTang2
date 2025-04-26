// import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import managerUserRouter from "./routes/managerUserRoute.js"; 
import orderRouter from "./routes/orderRoute.js"; 
import 'dotenv/config'; 
import express from 'express';  // You already imported express in a proper way above

// App configuration
const app = express();
const port = process.env.PORT || 4000; // environment variable for port

// Middleware
app.use(cors());
app.use(express.json()); // Use express.json() for parsing JSON requests
app.use('/images', express.static("uploads")); // static folder for uploads

// API Routes
app.use("/manager", managerUserRouter); // for manager login/signup
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter); // Correct order router

// Test Route
app.get("/", (req, res) => {
  res.send("API is working");
});

// Database connection
connectDB()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit process with failure code
  });

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err); // Log errors for debugging
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error", // Provide proper error message
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
