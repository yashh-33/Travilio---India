import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../config/supabase.js';
import { sendResponse, sendError } from '../utils/apiResponse.js';

// JWT Generation helper
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'travilio_production_secure_signing_key_2026',
    { expiresIn: '7d' }
  );
};

/**
 * Handle user registration
 */
export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // 1. Check if user already exists in PostgreSQL
    const checkQuery = 'SELECT id FROM users WHERE email = $1 OR username = $2 LIMIT 1';
    const { rows: existing } = await pool.query(checkQuery, [email.toLowerCase().trim(), username.trim()]);

    if (existing.length > 0) {
      return sendError(req, res, 400, 'User already exists.');
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Insert new user record
    const insertQuery = `
      INSERT INTO users (username, email, password) 
      VALUES ($1, $2, $3) 
      RETURNING id, username, email
    `;
    const { rows } = await pool.query(insertQuery, [
      username.trim(), 
      email.toLowerCase().trim(), 
      hashedPassword
    ]);
    const newUser = rows[0];

    // 4. Generate JWT and respond
    const token = generateToken(newUser.id);
    return sendResponse(req, res, 201, {
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    }, 'Registration successful.');

  } catch (err) {
    next(err);
  }
};

/**
 * Handle user login
 */
export const login = async (req, res, next) => {
  const { emailOrUsername, password } = req.body;

  try {
    // 1. Find user by email or username
    const findQuery = 'SELECT * FROM users WHERE email = $1 OR username = $2 LIMIT 1';
    const { rows } = await pool.query(findQuery, [
      emailOrUsername.toLowerCase().trim(), 
      emailOrUsername.trim()
    ]);
    const user = rows[0];

    if (!user) {
      return sendError(req, res, 400, 'Invalid credentials.');
    }

    // 2. Compare password hashes
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendError(req, res, 400, 'Invalid credentials.');
    }

    // 3. Generate JWT and respond
    const token = generateToken(user.id);
    return sendResponse(req, res, 200, {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    }, 'Login successful.');

  } catch (err) {
    next(err);
  }
};

/**
 * Get authenticated user's profile and saved itineraries
 */
export const getProfile = async (req, res, next) => {
  try {
    // 1. Fetch user basic profile
    const userQuery = 'SELECT id, username, email FROM users WHERE id = $1 LIMIT 1';
    const { rows: userRows } = await pool.query(userQuery, [req.user.id]);
    const user = userRows[0];

    if (!user) {
      return sendError(req, res, 404, 'User not found.');
    }

    // 2. Fetch user's saved trips
    const tripsQuery = 'SELECT * FROM saved_trips WHERE user_id = $1 ORDER BY created_at DESC';
    const { rows: tripRows } = await pool.query(tripsQuery, [req.user.id]);

    // 3. Map database columns (snake_case) to client-expected properties (camelCase / _id)
    const savedTrips = tripRows.map(t => ({
      _id: t.id,
      destinationId: t.destination_id,
      destinationName: t.destination_name,
      duration: t.duration,
      budgetTier: t.budget_tier,
      transportMode: t.transport_mode,
      totalCost: t.total_cost,
      customActivities: t.custom_activities || [],
      favorites: t.favorites || [],
      createdAt: t.created_at
    }));

    // 4. Return merged profile object
    return sendResponse(req, res, 200, {
      id: user.id,
      username: user.username,
      email: user.email,
      savedTrips
    }, 'Profile loaded successfully.');

  } catch (err) {
    next(err);
  }
};
