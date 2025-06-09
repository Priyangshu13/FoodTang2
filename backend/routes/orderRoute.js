import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { placeOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

// POST /api/order  (Protected route)
orderRouter.post('/', authMiddleware, placeOrder);

export default orderRouter;
