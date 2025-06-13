const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');
const mongoose = require('mongoose');
const schema = require('../models/schema');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

const postgresConnect = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('Connected to PostgreSQL with Drizzle ORM');
  } catch (err) {
    console.error('PostgreSQL connection error:', err);
    process.exit(1);
  }
};

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = { db, connectMongoDB, postgresConnect };
