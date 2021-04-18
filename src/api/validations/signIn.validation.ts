import { body } from 'express-validator';

/**
 * Validate if the body params are valid
 * @returns array of validations
 */
export const signInValidation = () => [
  body('username')
    .notEmpty().withMessage('Username is required')
    .isEmail()
    .withMessage('Username must be valid email'),
  body('password')
    .notEmpty().withMessage('Password is required'),
];
