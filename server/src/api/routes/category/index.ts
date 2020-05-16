import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import winston from 'winston';
import CategoryService from '../../../services/category';
import ProductService from "../../../services/product";

const categoryRoute = Router();

export default (routes: Router) => {
  routes.use('/category', categoryRoute);

  categoryRoute.get(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('GET /category endpoint with query: %o', req.query);

      try {
        const categoryServiceInstance = Container.get(CategoryService);
        const { categories } = await categoryServiceInstance.list(
          req.query.limit as string,
          req.query.level as string,
        );
        return res.status(200).json({ categories });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  );

  categoryRoute.get(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('GET /category endpoint with params: %o', req.params);

      try {
        const categoryServiceInstance = Container.get(CategoryService);
        const { category } = await categoryServiceInstance.get(
          req.params.id as string
        );
        return res.status(200).json({ category });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  );
};