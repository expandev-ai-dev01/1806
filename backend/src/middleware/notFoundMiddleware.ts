import { Request, Response } from 'express';
import { errorResponse } from '@/utils/responseHandler';

export const notFoundMiddleware = (req: Request, res: Response) => {
  res.status(404).json(errorResponse(`Not Found - ${req.method} ${req.originalUrl}`));
};
