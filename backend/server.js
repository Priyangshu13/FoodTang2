import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderModel from "./models/orderModel.js";

// App configuration
const app = express();
const port = process.env.PORT || 4000; // Use environment variable for port if available

// Middleware
app.use(express.json());
app.use(cors()); // You can configure CORS if needed, e.g., app.use(cors({ origin: 'http://your-frontend-domain.com' }))

// Database connection
connectDB()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit process if DB connection fails
  });

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads")); // Ensure 'uploads' directory exists and is accessible
app.use("/api/user", userRouter);
app.use("/api/cart",cartRouter) 
app.use("/api/order",orderModel)


app.get("/", (req, res) => {
  res.send("API is working");
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
