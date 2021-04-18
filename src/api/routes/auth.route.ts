import { Router } from 'express';
import { login, logout, refresh } from '../controllers/auth.controller';

const router = Router();

router.route('/login').post(login);
router.route('/refresh').post(refresh);
router.route('/logout').post(logout);

export { router as authRoutes };
