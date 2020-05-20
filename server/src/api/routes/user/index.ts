import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import winston from 'winston';
import UserService from '../../../services/user';
import { StatusCode as sc, ResponseMessage as rm, AuthUtil as au } from '../../../modules/util';

const userRoute = Router();

export default (routes: Router) => {
  routes.use('/users', userRoute);

  userRoute.get(
    '/click/:wholeCategoryId',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      const { wholeCategoryId } = req.params;
      logger.debug(`GET /user click log endpoint with query ${wholeCategoryId}`);

      try {
        const productNo = wholeCategoryId.split('>');

        const userServiceInstance = Container.get(UserService);
        const result = await userServiceInstance.clickLog(productNo[productNo.length - 1]);

        res.status(sc.OK).json(au.successTrue(rm.CLICK_LOG_SUCCESS, result));

      } catch (e) {
        logger.error(`🔥 error: ${e}`);
        return next(e);
      }
    }
  );

  userRoute.post(
    '/likes',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      const { productNo, wholeCategoryId, exist } = req.body;
      logger.debug(`POST /user like endpoint with query ${wholeCategoryId}`);

      try {
        const userServiceInstance = Container.get(UserService);
        const result = await userServiceInstance.setLike(productNo, wholeCategoryId.split('>'), exist);

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

  userRoute.get(
    '/likes/grid-view',
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger') as winston.Logger;
      logger.debug('GET /user grid view like list');

      try {
        const userServiceInstance = Container.get(UserService);
        const result = await userServiceInstance.selectLikeListForGridView();

        res.status(sc.OK).json(au.successTrue(rm.LIKE_VER_GRID_VIEW_SUCCESS, result));
      } catch (e) {
        logger.error(`error: ${e}`);
        return next(e);
      }
    }
  )
};
