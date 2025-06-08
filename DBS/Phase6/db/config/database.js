const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');
const mongoose = require('mongoose');
const schema = require('../models/schema')
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });


pool.on('connect', () => {
  console.log('Connected to PostgreSQL with Drizzle ORM');
});

pool.on('error', (err) => {
  console.error('PostgreSQL connection error:', err);
});

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = { db, connectMongoDB };