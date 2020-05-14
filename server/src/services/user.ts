import { Service, Inject, ContainerInstance } from 'typedi'
import { Model, Document } from 'mongoose';
import winston from 'winston';
import { IUser, IProduct } from '../interfaces';
import config from '../config';
import {
  BadRequestError,
  ConflictError,
  NotFoundError
} from '../modules/errors';

@Service()
export default class UserService {
  private userModel: Model<IUser & Document>;
  private productModel: Model<IProduct & Document>;
  private logger: winston.Logger;

  constructor(@Inject() container: ContainerInstance) {
    this.userModel = container.get('userModel');
    this.productModel = container.get('productModel');
    this.logger = container.get('logger');
  }

  public async clickLog(
    productNo: string
  ): Promise<void> {
    try {
      const userRecord = await this.userModel.findOne({ userName: config.personaNm });
      const productRecord = await this.productModel.findOne({ _id: productNo });

      if (!userRecord) throw new NotFoundError('User is not exist');
      if (!productRecord) throw new NotFoundError('Product is not exist');

      let users = userRecord.toObject();
      let products = productRecord.toObject();

      const idx = users.prefer.findIndex((p: any, i: any) => {
        p.productNo === parseInt(productNo);
        return i;
      });

      if (idx < 0) {
        const result = await userRecord.update({
          $push: {
            prefer: {
              productNo: products.productNo,
              categoryId: products.category.categoryId,
              rating: config.clickLog
            }
          }
        });
        return result;
      }

      if (users.prefer[idx].rating + config.clickLog <= 5) {
        users.prefer[idx].rating += config.clickLog;

        const result = await userRecord.update({
          prefer: users.prefer
        });
        return result;
      }

      users.prefer[idx].rating = 5.0;
      const result = await userRecord.update({
        prefer: users.prefer
      });
      return result;

    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}