import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/supabase.js';
import authRoutes from './routes/auth.js';
import destinationRoutes from './routes/destinations.js';
import tripRoutes from './routes/trips.js';
import errorHandler from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS with robust multi-origin configuration and trailing slash resilience
const rawOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',') 
  : [
      'http://localhost:5173', 
      'http://localhost:5000',
      'https://travilio-india.netlify.app', 
      'https://travilio-india-bakend.onrender.com',
      'https://travilio-india.vercel.app'
    ];

const allowedOrigins = rawOrigins.map(url => {
  let u = url.trim();
  if (u.endsWith('/')) u = u.slice(0, -1);
  return u;
});

app.use(cors({
  origin: (origin, callback) => {
    // Normalize incoming origin (trim, remove trailing slash)
    let incomingOrigin = origin ? origin.trim() : null;
    if (incomingOrigin && incomingOrigin.endsWith('/')) {
      incomingOrigin = incomingOrigin.slice(0, -1);
    }
    
    // Allow requests with no origin (like mobile apps, curl) or matched origins
    if (
      !incomingOrigin || 
      allowedOrigins.includes(incomingOrigin) || 
      incomingOrigin.includes('localhost') || 
      incomingOrigin.includes('127.0.0.1')
    ) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true
}));

app.use(express.json());

// Bind Health Check Endpoint
app.get('/api/health', async (req, res) => {
  try {
    // Ping database to verify connection health
    const dbCheck = await pool.query('SELECT NOW()');
    return res.json({
      status: 'ok',
      database: 'connected',
      dbTime: dbCheck.rows[0].now,
      serverTime: new Date()
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      database: 'disconnected',
      error: err.message,
      serverTime: new Date()
    });
  }
});

// Root Route
app.get('/', (req, res) => {
  res.json({
    message: 'Travilio Production Redesigned Backend (PostgreSQL) is Active 🚀'
  });
});

// Bind API Routes
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/trips', tripRoutes);

// Catch-all 404 handler for API routes (returns clean JSON instead of HTML)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    msg: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Register Centralized Error Handler (Must be registered last!)
app.use(errorHandler);

// Connect to Database and start server
const startServer = async () => {
  try {
    console.log('Testing Supabase PostgreSQL pool connection...');
    const check = await pool.query('SELECT NOW()');
    console.log(`✅ Supabase Database online! Server Time: ${check.rows[0].now}`);
    
    app.listen(PORT, () => {
      console.log(`🚀 Travilio Full-Stack Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Fatal: Could not connect to Supabase database. Server startup aborted.', err.message);
    process.exit(1);
  }
};

startServer();
