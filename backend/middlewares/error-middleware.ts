import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants.js';
import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Only log unexpected errors (500), not auth errors (401, 403, 400)
  if (err.status >= 500 || !err.status) {
    console.error(err.stack);
  }

  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    status: err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: err.message || RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
    errors: err.errors || [],
  });
  next();
};

export default errorMiddleware;
