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
import user from '../api/routes/user';

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
      const productRecord = await this.productModel.findById(productNo);

      if (!userRecord) throw new NotFoundError('User is not exist');
      if (!productRecord) throw new NotFoundError('Product is not exist');


      // this.logger.info(productRecord.category);

      // const idx = userRecord.prefer.findIndex((p) => console.log(p));
      // console.log(idx);

      // if (idx === undefined) {
      //   userRecord.update({
      //     prefer: userRecord.prefer.concat({
      //       productNo: productRecord.productNo,
      //       categoryId: productRecord.category.categoryId,
      //       rating: config.clickLog
      //     })
      //   });

      // } else {
      //   userRecord.prefer[idx].rating += config.clickLog;
      //   userRecord.update({
      //     prefer: userRecord.prefer
      //   });
      // }

    } catch (e) {
      // this.logger.error(e);
      throw e;
    }
  }
}