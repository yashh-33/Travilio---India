import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { fileDb } from '../db.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Save planned trip
router.post('/', authMiddleware, async (req, res) => {
  const {
    destinationId,
    destinationName,
    duration,
    budgetTier,
    transportMode,
    totalCost,
    customActivities,
    favorites
  } = req.body;

  if (!destinationId || !destinationName || !duration || !budgetTier || !transportMode || totalCost === undefined) {
    return res.status(400).json({ msg: 'Please provide all details to save this trip.' });
  }

  try {
    const isMongo = mongoose.connection.readyState === 1;
    let user;

    if (isMongo) {
      user = await User.findById(req.user.id);
    } else {
      user = await fileDb.findUserById(req.user.id);
    }

    if (!user) {
      return res.status(404).json({ msg: 'User not found.' });
    }

    const newTrip = {
      _id: Date.now().toString(),
      destinationId,
      destinationName,
      duration,
      budgetTier,
      transportMode,
      totalCost,
      customActivities: customActivities || [],
      favorites: favorites || []
    };

    if (isMongo) {
      user.savedTrips.push(newTrip);
      await user.save();
    } else {
      user.savedTrips = user.savedTrips || [];
      user.savedTrips.push(newTrip);
      await fileDb.saveUser(user);
    }

    res.status(201).json({
      msg: 'Trip saved successfully.',
      savedTrips: user.savedTrips
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error saving trip.' });
  }
});

// Get all saved trips
router.get('/', authMiddleware, async (req, res) => {
  try {
    const isMongo = mongoose.connection.readyState === 1;
    let user;

    if (isMongo) {
      user = await User.findById(req.user.id);
    } else {
      user = await fileDb.findUserById(req.user.id);
    }

    if (!user) {
      return res.status(404).json({ msg: 'User not found.' });
    }

    res.json(user.savedTrips || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error retrieving saved trips.' });
  }
});

// Delete a saved trip
router.delete('/:tripId', authMiddleware, async (req, res) => {
  try {
    const isMongo = mongoose.connection.readyState === 1;
    let user;

    if (isMongo) {
      user = await User.findById(req.user.id);
    } else {
      user = await fileDb.findUserById(req.user.id);
    }

    if (!user) {
      return res.status(404).json({ msg: 'User not found.' });
    }

    if (isMongo) {
      const tripToRemove = user.savedTrips.id(req.params.tripId);
      if (!tripToRemove) {
        return res.status(404).json({ msg: 'Trip not found.' });
      }
      tripToRemove.deleteOne();
      await user.save();
    } else {
      user.savedTrips = (user.savedTrips || []).filter(t => t._id !== req.params.tripId);
      await fileDb.saveUser(user);
    }

    res.json({
      msg: 'Trip removed successfully.',
      savedTrips: user.savedTrips
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error deleting trip.' });
  }
});

export default router;
