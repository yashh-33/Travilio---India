import express from 'express';
import * as authController from '../controllers/authController.js';
import authMiddleware from '../middleware/auth.js';
import { validateBody } from '../middleware/validateRequest.js';

const router = express.Router();

// Register route with body validation
router.post(
  '/register', 
  validateBody(['username', 'email', 'password']), 
  authController.register
);

// Login route with body validation
router.post(
  '/login', 
  validateBody(['emailOrUsername', 'password']), 
  authController.login
);

// Load profile (protected)
router.get(
  '/profile', 
  authMiddleware, 
  authController.getProfile
);

export default router;
