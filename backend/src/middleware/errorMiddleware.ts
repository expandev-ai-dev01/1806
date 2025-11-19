import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { config } from '@/config';
import { errorResponse } from '@/utils/responseHandler';

interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorMiddleware = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'An unexpected error occurred.';

  console.error('ERROR 💥', err);

  if (err instanceof ZodError) {
    return res.status(400).json(
      errorResponse('Validation Error', {
        issues: err.errors.map((e) => ({ path: e.path.join('.'), message: e.message })),
      })
    );
  }

  const response = errorResponse(
    message,
    config.env === 'development' ? { stack: err.stack } : undefined
  );

  return res.status(statusCode).json(response);
};
