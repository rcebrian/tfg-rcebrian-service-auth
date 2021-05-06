import { Router } from 'express';
import { validatorHandler, auth } from '@rcebrian/tfg-rcebrian-common';
import { signIn, refresh, signUp, signOut } from '../controllers/auth.controller';
import { signUpValidation, signInValidation } from '../validations';

const router = Router();

router.route('/signUp').post(signUpValidation(), validatorHandler, signUp);
router.route('/signIn').post(signInValidation(), validatorHandler, signIn);
router.route('/signOut').post(auth, signOut);
router.route('/refresh').post(auth, refresh);

export { router as authRoutes };
