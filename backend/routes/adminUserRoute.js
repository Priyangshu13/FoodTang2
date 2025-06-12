import express from 'express';
import { login } from '../controllers/adminUserController.js';
import { getAllOrders } from '../controllers/orderController.js';
import { loginValidation } from '../middleware/authmanager.js';
import { authMiddleware, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// ✅ Admin login
router.post('/login', loginValidation, login);

// ✅ Admin: Get all orders
router.get('/all-orders', authMiddleware, adminOnly, getAllOrders);

export default router;
