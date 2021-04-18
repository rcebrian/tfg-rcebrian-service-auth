import { validationResult } from 'express-validator';
import {
  Request, Response, NextFunction,
} from 'express';
import httpStatus from 'http-status';
import { APIError } from '../utils/errors';

/**
 * Validate the input in requests
 * @param req request with input form
 * @param res response
 * @param next next call
 * @returns
 */
export const validator = (req: Request, res: Response, next: NextFunction) => {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }
  const errors: any = [];
  validationErrors.array().forEach((err) => errors.push(err.msg));
  throw new APIError({ message: 'Bad request', errors, status: httpStatus.BAD_REQUEST });
};
