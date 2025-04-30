import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger/logger';

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Ensure the name of the error is set correctly
    this.name = this.constructor.name;

    // Capture the stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error(`Error occurred: ${err.message}`, {
    statusCode: err.statusCode,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
   logger.info(next)
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      details: (err as any).details || undefined,
    }),
  });
  
};