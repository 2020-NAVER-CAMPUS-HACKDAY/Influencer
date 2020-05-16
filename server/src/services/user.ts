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

  /**
   * @param productNo 
   * @param weight 
   */
  public async addWeight(
    productNo: string,
    weight: number
  ): Promise<any> {

    const selectProduct = (
      productNo: string,
      weight: number
    ): Promise<any> => {

      return new Promise(async (resolve, reject) => {
        const productRecord = await this.productModel.findOne({ _id: productNo });
        if (!productRecord) {
          reject('Product is not exist');
        }
        resolve({ productNo, productRecord, weight });
      });
    };

    const selectUser = (
      { productNo, productRecord, weight }: any
    ): Promise<any> => {

      return new Promise(async (resolve, reject) => {
        const userRecord = await this.userModel.findOne({ userName: config.personaName });
        if (!userRecord) {
          reject('User is not exist');
        }
        resolve({ productNo, productRecord, userRecord, weight });
      });
    };


    const checkExist = (
      { productNo, productRecord, userRecord, weight }: any
    ): Promise<any> => {

      return new Promise(async (resolve, reject) => {
        let products = productRecord.toObject();
        let users = userRecord.toObject();

        const idx = users.prefer.findIndex((p: any, i: any) => {
          p.productNo === parseInt(productNo);
          return i;
        });

        resolve({ userRecord, products, users, idx, weight });
      });
    };

    const addWeight = async ({ userRecord, products, users, idx, weight }: any) => {
      if (idx < 0) {
        const result = await userRecord.update({
          $push: {
            prefer: {
              productNo: products.productNo,
              categoryId: products.category.categoryId,
              rating: weight
            }
          }
        });

        return result
      }

      if (users.prefer[idx].rating + weight <= 5) {
        users.prefer[idx].rating += weight;

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
      selectProduct(productNo, weight)
        .then(selectUser)
        .then(checkExist)
        .then(addWeight)
        .catch(handleClicklogError);
  }

  /**
   * 
   * @param productNo 
   */
  public async clickLog(
    productNo: string
  ): Promise<any> {

    return await this.addWeight(productNo, config.clicklogWeight);
  }

  /**
   * 
   * @param productNo 
   * @param exist 
   */
  public async setLike(
    productNo: string,
    exist: boolean
  ): Promise<any> {

    const userRecord = await this.userModel.findOne({ userName: config.personaName });
    if (!userRecord) throw new NotFoundError('User is not exist');

    let users = userRecord.toObject();
    try {
      if (exist) {
        userRecord.like = users.like.filter((l: any) => (l !== productNo));
        return await userRecord.save();
      }

      users.like.push(productNo);

      userRecord.like = users.like;
      await userRecord.save();

    } catch (e) {
      this.logger.error(e);
      throw e;
    }

    return await this.addWeight(productNo, config.likeWeight);
  }

  public async selectLikeList(
  ): Promise<any> {
    const userLikeRecord = await this.userModel.findOne({ userName: config.personaName }).select('like -_id');
    if (!userLikeRecord) throw new NotFoundError('User is not exist');

    try {
      let userLikeList = userLikeRecord.toObject();
      let result: Array<any> = [];

      for (let like of userLikeList.like) {
        const product = await this.productModel.findOne({ productNo: like });
        result.push(product);
      }
      return result;

    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}