import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { APIError } from '../utils/errors';
import { JWT } from '../../config/env.config';

export const authorized = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    throw new APIError({ message: 'Unauthorized', status: httpStatus.UNAUTHORIZED });
  }
  const token = bearer.replace('Bearer ', '');

  // eslint-disable-next-line prefer-destructuring
  const secret: any = JWT.secret;

  jwt.verify(token, secret, (err: any, payload: any) => {
    if (err) {
      throw new APIError({ message: 'Unauthorized', stack: err, status: httpStatus.UNAUTHORIZED });
    } else {
      next();
    }
  });
};
