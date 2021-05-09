import { Router } from 'express';
import { auth } from '@rcebrian/tfg-rcebrian-common';
import {
  signIn, refresh, signUp, signOut, changePassword,
} from '../controllers/auth.controller';
import { signUpValidation, signInValidation, changePasswordValidation } from '../validations';

const router = Router();

/**
 * NO AUTH NEEDED
 */
router.route('/signIn').post(signInValidation(), signIn);

/**
 * NEED TO BE AUTHENTICATED
 */
router.route('/signUp').post(auth, signUpValidation(), signUp);
router.route('/refresh').post(auth, refresh);
router.route('/signOut').post(auth, signOut);
router.route('/change-password').put(auth, changePasswordValidation(), changePassword);

export { router as authRoutes };
