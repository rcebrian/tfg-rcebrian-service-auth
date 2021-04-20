import { Router } from 'express';
import { signIn, refresh } from '../controllers/auth.controller';
import { signInValidation } from '../validations';
import { validator } from '../middlewares';

const router = Router();

router.route('/signIn').post(signInValidation(), validator, signIn);
router.route('/refresh').post(refresh);

export { router as authRoutes };
