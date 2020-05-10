import { Application, Request, Response, NextFunction } from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { NotFoundError } from '../modules/errors';
import errorName from '../modules/util/errorName';
import config from '../config';
import routes from '../api';

export default ({ app }: { app: Application }) => {
  app.get('/status', (req: Request, res: Response) => {
    res.status(200).end();
  });

  app.head('/status', (req: Request, res: Response) => {
    res.status(200).end();
  });

  app.enable('trust proxy');

  app.use(cors());
  app.use(bodyParser.json());
  app.use(config.api.prefix, routes());

  /// catch 404 and forward to error handler
  app.use((req: Request, res: Response, next) => {
    const err = new NotFoundError('Not Found');
    next(err);
  });

  /// error handlers
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    switch (err.name) {
      case errorName.BAD_REQUEST:
      case errorName.CONFLICT:
      case errorName.UNAUTHORIZED:
        return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
