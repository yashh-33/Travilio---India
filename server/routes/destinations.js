import express from 'express';
import mongoose from 'mongoose';
import Destination from '../models/Destination.js';
import { fileDb } from '../db.js';

const router = express.Router();

// Retrieve all destinations
router.get('/', async (req, res) => {
  const { search } = req.query;

  try {
    const isMongo = mongoose.connection.readyState === 1;
    let list;

    if (isMongo) {
      let query = {};
      if (search) {
        const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const searchRegex = new RegExp(escapedSearch, 'i');
        query = {
          $or: [
            { name: searchRegex },
            { state: searchRegex },
            { category: searchRegex }
          ]
        };
      }
      list = await Destination.find(query);
    } else {
      list = await fileDb.findDestinations(search);
    }

    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error retrieving destinations.' });
  }
});

// Retrieve single destination
router.get('/:id', async (req, res) => {
  try {
    const isMongo = mongoose.connection.readyState === 1;
    let dest;

    if (isMongo) {
      dest = await Destination.findOne({ id: req.params.id });
    } else {
      dest = await fileDb.findDestinationById(req.params.id);
    }

    if (!dest) {
      return res.status(404).json({ msg: 'Destination not found.' });
    }
    res.json(dest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error retrieving destination details.' });
  }
});

export default router;
