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
  ): Promise<any> {

    const selectProduct = (productNo: string) => {
      return new Promise(async (resolve, reject) => {
        const productRecord = await this.productModel.findOne({ _id: productNo });
        if (!productRecord) {
          reject('Product is not exist');
        }
        resolve(productRecord);
      });
    };

    const selectUser = (productRecord: any) => {
      return new Promise(async (resolve, reject) => {
        const userRecord = await this.userModel.findOne({ userName: config.personaName });
        if (!userRecord) {
          reject('User is not exist');
        }
        resolve({ productRecord, userRecord });
      });
    };

    const checkExist = ({ productRecord, userRecord }: any) => {
      return new Promise(async (resolve, reject) => {
        let products = productRecord.toObject();
        let users = userRecord.toObject();

        const idx = users.prefer.findIndex((p: any, i: any) => {
          p.productNo === parseInt(productNo);
          return i;
        });

        resolve({ userRecord, products, users, idx });
      });
    };

    const addWeight = async ({ userRecord, products, users, idx }: any) => {
      if (idx < 0) {
        const result = await userRecord.update({
          $push: {
            prefer: {
              productNo: products.productNo,
              categoryId: products.category.categoryId,
              rating: config.clicklogWeight
            }
          }
        });

        return result
      }

      if (users.prefer[idx].rating + config.clicklogWeight <= 5) {
        users.prefer[idx].rating += config.clicklogWeight;

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
    };

    const handleClicklogError = (e: Error) => {
      this.logger.error(e);
      throw e;
    };

    return await
      selectProduct(productNo)
        .then(selectUser)
        .then(checkExist)
        .then(addWeight)
        .catch(handleClicklogError);
  }
}