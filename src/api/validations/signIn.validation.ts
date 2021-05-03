import { body } from 'express-validator';

/**
 * Validate if the body params are valid
 * @returns array of validations
 */
export const signInValidation = () => [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid email'),
  body('password')
    .notEmpty().withMessage('Password is required'),
];
