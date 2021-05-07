import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { Role } from '../repository/mysql/mysql.repository';

/**
 * Get all roles
 * @param req GET request
 * @param res OK with all roles
 */
export const findAll = (req: Request, res: Response) => {
  Role.scope('full').findAll().then((data: any) => {
    res.status(httpStatus.OK)
      .json({ data });
  });
};
