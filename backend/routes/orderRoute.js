import express from 'express';
import authMiddleware from '../middleware/auth.js';  
import { placeorder } from '../controllers/orderController.js'; 

const orderRouter = express.Router();

// POST route to place an order, with authentication middleware
orderRouter.post('/place', authMiddleware.place, placeorder); 
export default orderRouter;
