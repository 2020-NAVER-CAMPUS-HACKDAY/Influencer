import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '../config';
import Logger from './logger';

export default async (): Promise<Db> => {
  const connection = await mongoose.connect(config.databaseURI as string, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },(err) => {
    if (err) {
      Logger.error(`mongodb connection error ${err}`);
    } else {
      Logger.info('mongodb connection success');
    }
  });
  return connection.connection.db;
};
