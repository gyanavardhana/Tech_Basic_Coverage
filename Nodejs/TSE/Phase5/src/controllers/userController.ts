// src/controllers/userController.ts
import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { db } from "../db/db";
import { users } from "../db/schema";
import { generatesalt, hashPassword, createToken } from "../utils/jwt.util";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { logger } from "../logger/logger";
import { AppError } from "../middlewares/errorMiddleware";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const parsedBody = registerSchema.parse(req.body);
    const { username, email, password } = parsedBody;
    logger.info(`Register attempt: ${username}`);

    const existing = await db.select().from(users).where(eq(users.username, username));
    if (existing.length > 0) {
      logger.warn(`Username already taken: ${username}`);
      return next(new AppError("Username already exists", 400));
    }

    const salt = await generatesalt();
    const hashedPassword = await hashPassword(password, salt);

    await db.insert(users).values({
      username,
      email,
      password: hashedPassword,
    });

    logger.info(`User registered successfully: ${username}`);
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn("Validation error during registration", error.errors);
      const validationError = new AppError("Validation failed", 400);
      // @ts-ignore
      validationError.details = error.errors;
      return next(validationError);
    }
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const parsedBody = loginSchema.parse(req.body);
    const { email, password } = parsedBody;
    logger.info(`Login attempt: ${email}`);

    const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (user.length === 0) {
      logger.warn(`Login failed: No such user with email ${email}`);
      return next(new AppError("Invalid credentials", 400));
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      logger.warn(`Login failed: Incorrect password for email ${email}`);
      return next(new AppError("Invalid credentials", 400));
    }

    const token = createToken(user[0].id, JWT_SECRET);
    logger.info(`Login success: ${email}`);
    res.json({ token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn("Validation error during login", error.errors);
      const validationError = new AppError("Validation failed", 400);
      // @ts-ignore
      validationError.details = error.errors;
      return next(validationError);
    }
    next(error);
  }
};

export const logout = (_req: Request, res: Response) => {
  logger.info("Logout endpoint hit");
  res.json({ message: "Logged out successfully (discard token on client)" });
};
