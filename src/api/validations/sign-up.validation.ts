import { body } from 'express-validator';
import { User, Role, Group } from '../repository/mysql/mysql.repository';

/**
 * Validate if the body params are valid
 * @returns array of validations
 */
export const signUpValidation = () => [
  body('firstName')
    .notEmpty().withMessage('First name is required')
    .matches(/^[A-Za-z ]+$/)
    .withMessage('First name must be valid'),
  body('lastName')
    .notEmpty().withMessage('Last name is required')
    .matches(/^[A-Za-z ]+$/)
    .withMessage('First name must be valid'),
  body('phone')
    .notEmpty().withMessage('Mobile phone is required')
    .isMobilePhone(['es-ES'])
    .withMessage('Mobile phone must be valid'),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid')
    .custom(async (value) => {
      const emailCheck = await User.findOne({ where: { email: value } });
      return (emailCheck === null)
        ? Promise.resolve() : Promise.reject();
    })
    .withMessage('Email already in use'),
  body('address')
    .notEmpty().withMessage('Address is required')
    .matches(/^[A-Za-z0-9 ]+$/)
    .withMessage('Address must be valid'),
  body('country')
    .notEmpty().withMessage('Country is required')
    .matches(/^[A-Za-z ]+$/)
    .withMessage('Country must be valid'),
  body('postalCode')
    .notEmpty().withMessage('Postal code is required')
    .isPostalCode('ES')
    .withMessage('Postal code must be valid'),
  body('roleId')
    .notEmpty().withMessage('Role is required')
    .isNumeric()
    .withMessage('Role id must be valid')
    .custom(async (value) => {
      const role = await Role.findOne({ where: { id: value } });
      return (role !== null)
        ? Promise.resolve() : Promise.reject();
    })
    .withMessage('Invalid role'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, 'i')
    .withMessage('Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long'),
  body('confirmPassword')
    .notEmpty().withMessage('Confirm password is required')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords must match'),
  body('groupId')
    .custom(async (value) => {
      if (value) {
        const group = await Group.findOne({ where: { id: value } });
        return (group !== null)
          ? Promise.resolve() : Promise.reject();
      }
      Promise.resolve();
    })
    .withMessage('Invalid group'),
];
