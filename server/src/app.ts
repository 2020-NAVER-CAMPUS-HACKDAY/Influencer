import express, { Application } from 'express';
import config from './config';

import routes from './api/routes';
async function startServer() {
  const app: Application = express();
  app.use('/', routes);

  await require('./loaders').default({ expressApp: app });

  app.listen(config.port, () => {
    console.log(`Server is running in ${config.port} PORT!`);
  });
}

startServer();
