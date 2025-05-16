
import express from 'express';
import { login } from '../controllers/adminUserController.js';
import { loginValidation } from '../middleware/authmanager.js';

const router = express.Router();

router.post('/login', loginValidation, login);

export default router;
