import Container, { Service, Inject, ContainerInstance } from 'typedi'
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
    productId: string
  ): Promise<void> {
    try {
      const userRecord = this.userModel.findById(config.personaId);
      const productRecore = this.productModel.findById(productId);

      if (!userRecord) throw new NotFoundError('User is not exist');
      if (!productRecore) throw new NotFoundError('Product is not exist');

      const user = (await userRecord).toObject();
      const product = (await productRecore).toObject();

      const idx = user.prefer.findIndex(i => i.product_id === product.productId);
      if (idx === undefined) {
        userRecord.update({
          prefer: user.prefer.concat({
            product_id: product.productId,
            categoryId: product.categoryId,
            rating: config.clickLog
          })
        });

      } else {
        user.prefer[idx].rating += config.clickLog;
        userRecord.update({
          prefer: user.prefer
        });
      }

    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}