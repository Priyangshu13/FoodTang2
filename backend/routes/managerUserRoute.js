import express from 'express';
import { signup, login } from '../controllers/managerUserController.js';

const router = express.Router();

// Manager Auth Routes
router.post('/signup', signup);
router.post('/login', login);

export default router;
