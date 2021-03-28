import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { Company } from '../repository/mysql/mysql.repository';

export const findAll = (req: Request, res: Response) => {
  Company.findAll().then((data) => {
    res.status(httpStatus.OK)
      .json({ data });
  }).catch((err) => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ err: err.message });
  });
};
