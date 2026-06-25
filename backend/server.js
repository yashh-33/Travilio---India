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

// Enable CORS with optional environment-based origin limits
const allowedOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',') 
  : ['http://localhost:5173', 'https://travilio-india.vercel.app'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin or any local development host
    if (!origin || allowedOrigins.includes(origin) || origin.includes('localhost') || origin.includes('127.0.0.1')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
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
