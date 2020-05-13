import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import winston from 'winston';
import UserService from '../../../services/user';

const userRoute = Router();

export default (routes: Router) => {
  routes.use('/user', userRoute);

  userRoute.put(
    '/click/:productNo',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      const { productNo } = req.params;
      logger.debug(`PUT /user endpoint with query ${productNo}`);

      try {
        const userServiceInstance = Container.get(UserService);
        await userServiceInstance.clickLog(productNo);

      } catch (e) {
        logger.error(`🔥 error: ${e}`);
        return next(e);
      }
    }
  );
};