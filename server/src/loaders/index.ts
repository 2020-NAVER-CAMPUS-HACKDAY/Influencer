import { Application } from 'express';
import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import swaggerLoader from './swagger';
import mongooseLoader from './mongoose';
import Logger from './logger';

export default async ({ expressApp }: { expressApp: Application }) => {
  await mongooseLoader();

  const productModel = {
    name: 'productModel',
    model: require('../models/product').default,
  };

  const categoryModel = {
    name: 'categoryModel',
    model: require('../models/category').default,
  };

  const userModel = {
    name: 'userModel',
    model: require('../models/user').default,
  };

  await dependencyInjectorLoader({
    models: [productModel, categoryModel, userModel],
  });
  Logger.info('Dependency Injector loaded');

  await swaggerLoader({ app: expressApp });

  await expressLoader({ app: expressApp });
  Logger.info('Express Intialized');
};
