import { Router } from 'express';
import { auth, validatorHandler } from '@rcebrian/tfg-rcebrian-common';
import {
  signIn, refresh, signUp, signOut, changePassword,
} from '../controllers/auth.controller';
import { signUpValidation, signInValidation, changePasswordValidation } from '../validations';

const router = Router();

/**
 * NO AUTH NEEDED
 */
router.route('/signIn').post(signInValidation(), validatorHandler, signIn);

/**
 * NEED TO BE AUTHENTICATED
 */
router.route('/signUp').post(auth, signUpValidation(), validatorHandler, signUp);
router.route('/refresh').post(auth, refresh);
router.route('/signOut').post(auth, signOut);
router.route('/change-password').put(auth, changePasswordValidation(), validatorHandler, changePassword);

export { router as authRoutes };
