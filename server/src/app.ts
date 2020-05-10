import express, { Application } from 'express';
import config from './config';
import Logger from './loaders/logger';
import routes from './api/routes';
async function startServer() {
  const app: Application = express();
  app.use('/', routes);

  await require('./loaders').default({ expressApp: app });

  app.listen(config.port, (err) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
    }
    Logger.info(`Server is running in ${config.port} PORT!`);
  });
}

startServer();
