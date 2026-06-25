import express from 'express';
import * as tripController from '../controllers/tripController.js';
import authMiddleware from '../middleware/auth.js';
import { validateBody } from '../middleware/validateRequest.js';

const router = express.Router();

// Save planned trip (protected + body validated)
router.post(
  '/',
  authMiddleware,
  validateBody(['destinationId', 'destinationName', 'duration', 'budgetTier', 'transportMode', 'totalCost']),
  tripController.saveTrip
);

// Get all saved trips of the user (protected)
router.get(
  '/',
  authMiddleware,
  tripController.getSavedTrips
);

// Delete a saved trip (protected)
router.delete(
  '/:id',
  authMiddleware,
  tripController.deleteTrip
);

export default router;
