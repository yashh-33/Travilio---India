import express from 'express';
import * as destinationController from '../controllers/destinationController.js';

const router = express.Router();

// Retrieve all destinations with search & filters
router.get('/', destinationController.getAllDestinations);

// Retrieve single destination complete profile
router.get('/:id', destinationController.getDestinationById);

export default router;
