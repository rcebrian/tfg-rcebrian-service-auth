import { body } from 'express-validator';

/**
 * Validate that it complies with:
 *  - oldPassword: not empty (validation of the same password occurs in controller)
 *  - password: not empty AND is a new valid password
 *  - confirmPassword: not empty AND same as password
 * @returns array of validations
 */
export const changePasswordValidation = () => [
  body('oldPassword')
    .notEmpty().withMessage('Old password is required'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, 'i')
    .withMessage('Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long'),
  body('confirmPassword')
    .notEmpty().withMessage('Confirm password is required')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords must match'),
];
