import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import winston from 'winston';
import UserService from '../../../services/user';

const userRoute = Router();
const logger = Container.get('logger') as winston.Logger;

export default (routes: Router) => {
  routes.use('/user', userRoute);

  userRoute.put(
    '/click/:productId',
    async (req: Request, res: Response, next: NextFunction) => {
      const { productId } = req.params;
      logger.debug(`PUT /user endpoint with query ${productId}`);

      try {
        const userServiceInstance = Container.get(UserService);
        await userServiceInstance.clickLog(productId);
      }
    }
  );
};