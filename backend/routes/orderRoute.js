import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
  placeOrder,
  getMyOrders,
  updatePaymentStatus,
  getAllOrdersForAdmin
} from '../controllers/orderController.js';

const orderRouter = express.Router();

// User Routes
orderRouter.post('/', authMiddleware, placeOrder);
orderRouter.get('/my-orders', authMiddleware, getMyOrders);

// Admin Routes
orderRouter.get('/', getAllOrdersForAdmin); // ✅ Get all orders (for payment updation page)
orderRouter.put('/update-payment/:id', updatePaymentStatus); // ✅ Update payment status by admin

export default orderRouter;