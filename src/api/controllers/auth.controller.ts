import httpStatus from 'http-status';
import { Request, Response } from 'express';

export const login = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_IMPLEMENTED).json();
};

export const refresh = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_IMPLEMENTED).json();
};

export const logout = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_IMPLEMENTED).json();
};
