export type Config = {
  app: AppConfig;
  dataBase: dataBaseConfig;
  redis: redisConfig;
};

export type AppConfig = {
  port: number;
  host: string;
};

export type dataBaseConfig = {
  port: number;
  host: string;
  user: string;
  password: string;
  dbName: string;
};

export type redisConfig = {
  port: number;
  host: string;
  password: string;
};
