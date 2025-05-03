import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import "dotenv/config";
import { logger } from "../logger/logger";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);
export const connectDB = async () => {
  try {
    await pool.connect();
    logger.info("Database connected successfully");
  } catch (error) {
    logger.error("Database connection failed", error);
    process.exit(1); 
  }
};
