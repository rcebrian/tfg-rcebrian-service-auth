import { Router } from 'express';
import { validatorHandler, auth } from '@rcebrian/tfg-rcebrian-common';
import { signIn, refresh } from '../controllers/auth.controller';
import { signInValidation } from '../validations';

const router = Router();

router.route('/signIn').post(signInValidation(), validatorHandler, signIn);
router.route('/refresh').post(auth, refresh);

export { router as authRoutes };
