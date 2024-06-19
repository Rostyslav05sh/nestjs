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
    accesSecret: process.env.ACCCESS_TOKEN,
    accesExpiresIn: parseInt(process.env.ACCESS_EXPIRES_IN),
    refreshSecret: process.env.REFRESH_TOKEN,
    refreshExpiresIn: parseInt(process.env.REFRESH_EXPIRES_IN),
  },
  aws: {
    region: process.env.AWS_S3_REGION,
    accessKey: process.env.AWS_S3_ACCESS_KEY,
    secretKey: process.env.AWS_S3_SECRET_KEY,
    bucketName: process.env.AWS_S3_BUCKET_NAME,
    bucketUrl: process.env.AWS_S3_BUCKET_URL,
    endpoint: process.env.AWS_S3_ENDPOINT,
  },
});
