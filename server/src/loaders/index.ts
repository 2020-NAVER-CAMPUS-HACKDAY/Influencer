import { Application } from 'express';
import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import swaggerLoader from './swagger';
import mongooseLoader from './mongoose';
import Logger from './logger';

export default async ({ expressApp }: { expressApp: Application }) => {
  await mongooseLoader();
  Logger.info('DB loaded and connected!');
  Logger.debug(`${process.env.DB_URI}${process.env.DB_NAME}`);

  const productModel = {
    name: 'productModel',
    model: require('../models/product').default,
  };

  const userModel = {
    name: 'userModel',
    model: require('../models/user').default,
  }

  const categoryModel = {
    name: 'categoryModel',
    model: require('../models/category').default,
  };

  await dependencyInjectorLoader({
    models: [productModel, userModel, categoryModel],
  });
  Logger.info('Dependency Injector loaded');

  await swaggerLoader({ app: expressApp });

  await expressLoader({ app: expressApp });
  Logger.info('Express Intialized');
};
