import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import winston from 'winston';
import { celebrate, Joi } from 'celebrate';
import ProductService from '../../../services/product';
import { IProductInputDTO } from '../../../interfaces/product';

const productRoute = Router();

export default (routes: Router) => {
  routes.use('/product', productRoute);

  productRoute.get(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('GET /product endpoint with query: %o', req.query);

      try {
        const productServiceInstance = Container.get(ProductService);
        const { products } = await productServiceInstance.list(
          req.query.page as string,
          req.query.limit as string
        );
        return res.status(200).json({ products });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  );

  productRoute.get(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('GET /product endpoint with params: %o', req.params);

      try {
        const productServiceInstance = Container.get(ProductService);
        const { product } = await productServiceInstance.get(
          req.params.id as string
        );
        return res.status(200).json({ product });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  );

  productRoute.post(
    '/',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('POST /product endpoint with body: %o', req.body);

      try {
        const productServiceInstance = Container.get(ProductService);
        const { product } = await productServiceInstance.create(
          req.body as IProductInputDTO
        );
        return res.status(201).json({ product });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  );

  productRoute.put(
    '/:id',
    (req: Request, res: Response, next: NextFunction) => {}
  );

  productRoute.patch(
    '/:id',
    (req: Request, res: Response, next: NextFunction) => {}
  );

  productRoute.delete(
    '/:id',
    (req: Request, res: Response, next: NextFunction) => {}
  );
};
