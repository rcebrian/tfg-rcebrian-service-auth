import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { APIError } from '@rcebrian/tfg-rcebrian-common';
import {
  Device, Login, Role, User, UsersGroups,
} from '../repository/mysql/mysql.repository';
import { JWT } from '../../config/env.config';

/**
 * Generate an access token with an add payload
 * @param user to payload token
 * @returns jwt access token
 */
const generateAccessToken = (user: any) => {
  // eslint-disable-next-line prefer-destructuring
  const secret: any = JWT.secret;
  const accessToken = jwt.sign({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    role: user.role.name,
  }, secret, {
    expiresIn: JWT.expires,
  });

  Login.update({
    accessToken,
  }, {
    where: {
      id: user.id,
    },
  });

  return accessToken;
};

/**
 * Generate an access token when a user sign in to the app
 * @param req POST req with validated form
 * @param res data object with access token
 * @param next
 */
export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  User.findOne({
    where: {
      email: req.body.email,
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
    const accessToken = generateAccessToken(user);

    res.status(httpStatus.OK).json({
      data: {
        accessToken,
      },
    });
  }).catch((err) => {
    next(new APIError({ message: err.message, errors: err.errors, status: err.status }));
  });
};

/**
 * Generate a new access token
 * @param req POST old jwt token in auth headers
 * @param res OK with new access token
 */
export const refresh = (req: Request, res: Response) => {
  const token: any = req.headers.authorization?.replace('Bearer ', '');
  const jwtSecret: any = process.env.JWT_SECRET;

  jwt.verify(token, jwtSecret, (err: any, payload: any) => {
    if (!err) {
      const accessToken = generateAccessToken(payload);

      res.status(httpStatus.OK).json({
        data: {
          accessToken,
        },
      });
    }
  });
};

const generateUnexpiredToken = (user: User) => {
  // eslint-disable-next-line prefer-destructuring
  const secret: any = JWT.secret;
  const bearerToken = jwt.sign({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
  }, secret, {
  });

  return bearerToken;
};

export const signUp = async (req: Request, res: Response) => {
  const userForm = req.body;

  const newUser = await User.create({
    firstName: userForm.firstName,
    lastName: userForm.lastName,
    phone: userForm.phone,
    email: userForm.email,
    address: userForm.address,
    country: userForm.country,
    postalCode: userForm.postalCode,
    roleId: userForm.roleId,
    login: {
      passwordHash: await bcrypt.hash(userForm.password, 10),
    },
  }, {
    include: [Login, Role],
  });

  let bearerToken;
  if (newUser.roleId !== 1) {
    bearerToken = generateUnexpiredToken(newUser);
    await Device.create({
      id: newUser.id,
      bearerToken,
    });
  }

  if (userForm.groupId) {
    await UsersGroups.create({
      userId: newUser.id,
      groupId: userForm.groupId,
    });
  }

  res.status(httpStatus.CREATED).json();
};

export const signOut = async (req: Request, res: Response) => {
  const token: any = req.headers.authorization?.replace('Bearer ', '');

  const decoded = jwt.decode(token, { complete: true });

  const payload: any = decoded?.payload;

  await Login.update({
    accessToken: null,
  }, {
    where: { id: payload?.id },
  });

  res.status(httpStatus.OK).json();
};
