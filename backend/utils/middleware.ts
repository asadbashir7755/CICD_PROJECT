import { retrieveDataFromCache } from './cache-posts.js';
import { HTTP_STATUS } from './constants.js';
import { Request, Response, NextFunction } from 'express';

export const cacheHandler =
  (key: string) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cachedData = await retrieveDataFromCache(key);
      if (cachedData) {
        return res.status(HTTP_STATUS.OK).json(cachedData);
      }
      next(); // Proceed to the route handler if data is not cached
    } catch (err: any) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  };
