import express from 'express';
import {
  placeOrder,
  updatePaymentStatus,
  getAllOrders,
  getMyOrders
} from '../controllers/orderController.js';

const router = express.Router();

// POST /orders/place
router.post('/place', placeOrder);

// PUT /orders/payment/:id
router.put('/payment/:id', updatePaymentStatus);

// GET /orders/all
router.get('/all', getAllOrders);

// ✅ New route: GET /orders/my/:userId
router.get('/my/:userId', getMyOrders);

export default router;
