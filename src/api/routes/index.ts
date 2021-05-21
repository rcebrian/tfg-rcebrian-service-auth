import { Router } from 'express';
import { authRoutes } from './auth.route';
import { rolesRoutes } from './roles.route';

const apiRouter = Router();

apiRouter.use('/', authRoutes);
apiRouter.use('/roles', rolesRoutes);

export default apiRouter;
