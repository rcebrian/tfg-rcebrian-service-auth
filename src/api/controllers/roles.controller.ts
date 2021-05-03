import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { Role } from '../repository/mysql/mysql.repository';

export const findAll = (req: Request, res: Response) => {
  Role.scope('full').findAll().then((data: any) => {
    res.status(httpStatus.OK)
      .json({ data });
  });
};
