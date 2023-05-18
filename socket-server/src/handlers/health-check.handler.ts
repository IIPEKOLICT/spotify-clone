import { NextFunction, Request, Response } from 'express';

export const healthCheck = async (request: Request, response: Response, next: NextFunction) => {
  try {
    response.json({ status: 'ok' });
  } catch (error) {
    next(error);
  }
};
