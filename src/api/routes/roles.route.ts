import { Router } from 'express';
import { auth } from '@rcebrian/tfg-rcebrian-common';
import { findAll } from '../controllers/roles.controller';

const router = Router();

router.route('/').get(auth, findAll);

export { router as rolesRoutes };
