import { Router } from 'express';
import { signIn, logout, refresh } from '../controllers/auth.controller';
import { signInValidation } from '../validations';
import { validator } from '../middlewares';

const router = Router();

router.route('/signIn').post(signInValidation(), validator, signIn);
router.route('/refresh').post(refresh);
router.route('/logout').post(logout);

export { router as authRoutes };
