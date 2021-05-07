import { body } from 'express-validator';

/**
 * Validate that it complies with:
 *  - email: not empty AND is a valid email
 *  - password: not empty
 * @returns array with errors
 */
export const signInValidation = () => [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid email'),
  body('password')
    .notEmpty().withMessage('Password is required'),
];
