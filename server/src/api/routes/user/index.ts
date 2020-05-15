import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import winston from 'winston';
import UserService from '../../../services/user';
import { StatusCode as sc, ResponseMessage as rm, AuthUtil as au } from '../../../modules/util';

const userRoute = Router();

export default (routes: Router) => {
  routes.use('/users', userRoute);

  userRoute.get(
    '/click/:productNo',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      const { productNo } = req.params;
      logger.debug(`GET /user click log endpoint with query ${productNo}`);

      try {
        const userServiceInstance = Container.get(UserService);
        const result = await userServiceInstance.clickLog(productNo);

        res.status(sc.OK).json(au.successTrue(rm.CLICK_LOG_SUCCESS, result));

      } catch (e) {
        logger.error(`🔥 error: ${e}`);
        return next(e);
      }
    }
  );

  userRoute.post(
    '/likes/:productNo',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      const { productNo } = req.params;
      const { exist } = req.body;
      logger.debug(`POST /user like endpoint with query ${productNo}`);

      try {
        const userServiceInstance = Container.get(UserService);
        const result = await userServiceInstance.setLike(productNo, exist);

        res.status(sc.OK).json(au.successTrue(rm.LIKE_SUCCESS, result));

      } catch (e) {
        logger.error(`🔥 error: ${e}`);
        return next(e);
      }
    }
  );

  userRoute.get(
    '/likes',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      const { productNo } = req.params;
      const { exist } = req.body;
      logger.debug(`GET /user like list endpoint with query`);

      try {
        const userServiceInstance = Container.get(UserService);
        const result = await userServiceInstance.selectLikeList();

        res.status(sc.OK).json(au.successTrue(rm.LIKE_SUCCESS, result));

      } catch (e) {
        logger.error(`🔥 error: ${e}`);
        return next(e);
      }
    }
  );
};