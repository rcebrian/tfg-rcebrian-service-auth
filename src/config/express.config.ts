import express, { json, Request, Response } from 'express';
import morgan from 'morgan';
import httpStatus from 'http-status';
import router from '../api/routes';
import { winstonStream } from './winston.config';
import { errorHandler } from '../api/middlewares/errors.middleware';

/**
 * Express instance
 * @public
 */
const app = express();

app.use(morgan(':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms', { stream: winstonStream }));

app.use(json());

app.use('/api', router);

app.use(errorHandler);

app.get('*', (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json();
});

export = app;
