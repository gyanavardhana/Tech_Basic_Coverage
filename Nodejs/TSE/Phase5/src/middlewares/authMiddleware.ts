import { RequestHandler } from 'express';
import { verifyToken } from '../utils/jwt.util';
import { Secret } from 'jsonwebtoken';
import { logger } from '../logger/logger';

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'your-secret-key';

export const authenticate: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  logger.info('Authentication request received');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logger.warn('Unauthorized access attempt: No token provided');
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token, JWT_SECRET);

  if (!decoded || typeof decoded === 'string') {
    logger.warn('Unauthorized access attempt: Invalid token');
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
    return;
  }

  (req as any).userId = (decoded as any).userId;
  logger.info(`Authentication successful for user ID: ${(req as any).userId}`);

  next();
};