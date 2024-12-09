import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';


import transactionRoutes from './routes/Transactionroutes.js'; 
const app = express();

// Environment variables
const PORT = process.env.PORT || 5000;
const mongoDBURL = process.env.MONG_URI || 'mongodb://localhost:27017/myapp';

// Middleware
app.use(express.json()); 
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(morgan('dev'));

// Routes
app.use('/Transactions', transactionRoutes); 

// Test route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// MongoDB connection and server startup
mongoose.connect(mongoDBURL)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
