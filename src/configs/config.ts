import * as process from 'process';

import { Config } from './config.type';

export default (): Config => ({
  app: {
    port: parseInt(process.env.APP_PORT) || 3005,
    host: process.env.APP_HOST || '0.0.0.0',
  },
  dataBase: {
    port: parseInt(process.env.PORTGRES_PORT) || 5432,
    host: process.env.PORTGRES_HOST,
    user: process.env.PORTGRES_USER,
    password: process.env.PORTGRES_PASSWORD,
    dbName: process.env.PORTGRES_DBNAME,
  },
  redis: {
    port: parseInt(process.env.REDIS_PORT) || 6379,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  },
  sentry: {
    dns: process.env.SENTRY_DSN,
    environment: process.env.SENTRY_ENVIRONMENT,
    debug: process.env.SENTRY_DEBUG === 'true',
  },
  jwt: {
    accesSecret: process.env.accesToken,
    accesExpiresIn: parseInt(process.env.accesExpiresIn),
    refreshSecret: process.env.refreshToken,
    refreshExpiresIn: parseInt(process.env.refreshExpiresIn),
  },
});
