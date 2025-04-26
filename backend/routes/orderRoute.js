import express from 'express';
import authMiddleware from '../middleware/auth.js';  
import { placeOrder } from '../controllers/orderController.js'; 

const orderRouter = express.Router();

// Route to place an order (protected route)
orderRouter.post('/', authMiddleware, placeOrder);

export default orderRouter;
