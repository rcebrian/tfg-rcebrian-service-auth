import { Sequelize } from 'sequelize-typescript';
import {
  Role, Group, Company, Login, User, UsersGroups,
} from '@rcebrian/tfg-rcebrian-domain';
import { DATABASE } from '../../../config/env.config';

import logger from '../../../config/winston.config';

const sequelize = new Sequelize({
  database: DATABASE.database,
  username: DATABASE.username,
  password: DATABASE.password,
  host: DATABASE.host,
  port: DATABASE.port,
  dialect: 'mysql',
  logging: false,
  models: [Role, Group, Company, Login, User, UsersGroups],
});

sequelize.authenticate()
  .then(() => {
    logger.info('Connection has been established successfully');
  })
  .catch((err) => {
    logger.error(`Unable to connect to the database: ${err}`);
  });

export default sequelize;

export {
  Role, Group, Company, Login, User, UsersGroups,
};
