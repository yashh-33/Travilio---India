import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { fileDb } from '../db.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'travilio_premium_signature_key_2026',
    { expiresIn: '7d' }
  );
};

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields.' });
  }

  try {
    const isMongo = mongoose.connection.readyState === 1;
    let existingUser;

    if (isMongo) {
      existingUser = await User.findOne({
        $or: [{ email: email.toLowerCase() }, { username: username.trim() }]
      });
    } else {
      existingUser = await fileDb.findUserByQuery({
        $or: [{ email: email.toLowerCase() }, { username: username.trim() }]
      });
    }

    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userId = Date.now().toString();

    let savedUser;
    if (isMongo) {
      const newUser = new User({
        username: username.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword
      });
      savedUser = await newUser.save();
    } else {
      const newUser = {
        _id: userId,
        username: username.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        savedTrips: []
      };
      savedUser = await fileDb.saveUser(newUser);
    }

    const token = generateToken(savedUser._id);
    res.status(201).json({
      token,
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error during registration.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { emailOrUsername, password } = req.body;

  if (!emailOrUsername || !password) {
    return res.status(400).json({ msg: 'Please enter all credentials.' });
  }

  try {
    const isMongo = mongoose.connection.readyState === 1;
    let user;

    if (isMongo) {
      user = await User.findOne({
        $or: [
          { email: emailOrUsername.toLowerCase().trim() },
          { username: emailOrUsername.trim() }
        ]
      });
    } else {
      user = await fileDb.findUserByQuery({
        $or: [
          { email: emailOrUsername.toLowerCase().trim() },
          { username: emailOrUsername.trim() }
        ]
      });
    }

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials.' });
    }

    const token = generateToken(user._id);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error during login.' });
  }
});

// Profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const isMongo = mongoose.connection.readyState === 1;
    let user;

    if (isMongo) {
      user = await User.findById(req.user.id).select('-password');
    } else {
      user = await fileDb.findUserById(req.user.id);
      if (user) {
        // Exclude password from response
        const { password, ...userWithoutPassword } = user;
        user = userWithoutPassword;
      }
    }

    if (!user) {
      return res.status(404).json({ msg: 'User not found.' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error loading profile.' });
  }
});

export default router;
