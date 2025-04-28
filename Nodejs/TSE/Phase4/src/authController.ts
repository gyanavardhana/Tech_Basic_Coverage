// src/authController.ts
import { Request, Response } from 'express';
import { z } from 'zod';
import { generatesalt, hashPassword, createToken } from './jwt';
import { users } from './memoryStore';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { logger } from './logger/logger';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});


export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const parsedBody = registerSchema.parse(req.body);  

    const { username, password } = parsedBody;
    logger.info(`Register request received for username: ${username}`);

    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      logger.warn(`Registration failed: User already exists for username: ${username}`);
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await generatesalt();
    const hashedPassword = await hashPassword(password, salt);

    const newUser = {
      id: uuidv4(),
      username,
      password: hashedPassword,
    };

    users.push(newUser);
    logger.info(`User registered successfully with username: ${username}`);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn(`Validation failed: ${error.errors}`);
      return res.status(400).json({ message: 'Validation failed', errors: error.errors });
    }
    logger.error(`Error during registration`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const parsedBody = loginSchema.parse(req.body); 

    const { username, password } = parsedBody;
    logger.info(`Login request received for username: ${username}`);

    const user = users.find((u) => u.username === username);
    if (!user) {
      logger.warn(`Login failed: Invalid credentials for username: ${username}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Login failed: Password mismatch for username: ${username}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = createToken(user.id, JWT_SECRET);
    logger.info(`Login successful for username: ${username}`);
    res.json({ token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle Zod validation errors
      logger.warn(`Validation failed: ${error.errors}`);
      return res.status(400).json({ message: 'Validation failed', errors: error.errors });
    }
    logger.error(`Error during login for username: ${req.body.username}`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Logout function
export const logout = (_req: Request, res: Response) => {
  logger.info('Logout request received');
  res.json({ message: 'Logged out successfully (client must discard token)' });
};
