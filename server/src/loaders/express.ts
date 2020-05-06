import { Application, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';

export default ({ app }: { app: Application }) => {
  app.get('/status', (req: Request, res: Response) => {
    res.status(200).end();
  });

  app.head('/status', (req: Request, res: Response) => {
    res.status(200).end();
  });

  app.enable('trust proxy');

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
};
