import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import winston from 'winston';
import { celebrate, Joi } from 'celebrate';
import ProductService from '../../../services/product';
import { IProductInputDTO } from '../../../interfaces';
import { StatusCode as sc, ResponseMessage as rm, AuthUtil as au } from '../../../modules/util';

const productRoute = Router();

export default (routes: Router) => {
  routes.use('/products', productRoute);

  productRoute.get(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('GET /products endpoint with query: %o', req.query);

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
    '/category/:id',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('GET /products endpoint with params: %o query: %o', req.params, req.query);

      try {
        const productServiceInstance = Container.get(ProductService);
        const { products } = await productServiceInstance.listCategory(
          req.params.id as string,
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
      logger.debug('GET /products endpoint with params: %o', req.params);

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
      logger.debug('POST /products endpoint with body: %o', req.body);

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
    (req: Request, res: Response, next: NextFunction) => { }
  );

  productRoute.patch(
    '/:id',
    (req: Request, res: Response, next: NextFunction) => { }
  );

  productRoute.delete(
    '/:id',
    (req: Request, res: Response, next: NextFunction) => { }
  );

};
