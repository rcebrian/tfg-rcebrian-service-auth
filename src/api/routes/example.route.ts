import { Router } from 'express';
import { findAll } from '../controllers/example.controller';

const router = Router();

router.route('/').get(findAll);

export { router as exampleRoutes };
