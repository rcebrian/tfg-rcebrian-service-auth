import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Login, Role, User } from '../repository/mysql/mysql.repository';
import { APIError } from '../utils/errors';
import { JWT } from '../../config/env.config';

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  User.findOne({
    where: {
      email: req.body.username,
    },
    include: [Login, Role],
  }).then((user) => {
    // check if user is in db
    if (!user) {
      throw new APIError({ message: 'Unauthorized', errors: ['Incorrect username or password'], status: httpStatus.UNAUTHORIZED });
    }

    // check if is the correct password
    const validPassword = bcrypt.compareSync(
      req.body.password,
      user.login.passwordHash,
    );

    if (!validPassword) {
      throw new APIError({ message: 'Unauthorized', errors: ['Incorrect username or password'], status: httpStatus.UNAUTHORIZED });
    }

    // all OK
    // eslint-disable-next-line prefer-destructuring
    const secret: any = JWT.secret;
    const accessToken = jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role.name,
    }, secret, {
      // expiresIn: JWT.expires,
    });

    const refreshToken = jwt.sign({}, secret, {
      expiresIn: JWT.refresh,
    });

    // set token on db for the rest of micros
    Login.update({
      accessToken,
      refreshToken,
    }, {
      where: {
        id: user.id,
      },
    });

    res.status(httpStatus.OK).json({
      data: {
        accessToken,
        refreshToken,
      },
    });

    // res.status(httpStatus.OK).json({ token });
  }).catch((err) => {
    next(new APIError({ message: err.message, errors: err.errors, status: err.status }));
  });
};

export const refresh = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_IMPLEMENTED).json();
};

export const logout = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_IMPLEMENTED).json();
};
