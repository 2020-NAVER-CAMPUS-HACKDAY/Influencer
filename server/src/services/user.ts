import { Service, Inject, ContainerInstance } from 'typedi'
import { Model, Document } from 'mongoose';
import winston from 'winston';
import { IUser, IProduct, UserLike } from '../interfaces';
import config from '../config';
import {
  BadRequestError,
  ConflictError,
  NotFoundError
} from '../modules/errors';

const categoryCode: any = {
  '50000000': 'clothLike',
  '50000001': 'accessaryLike',
  '50000002': 'beautyLike',
  '50000003': 'digitalLike',
  '50000004': 'interialLike',
  '50000005': 'babyLiike',
  '50000006': 'footLike',
  '50000007': 'sportLike',
  '50000008': 'lifeLike',
  '50000009': 'leisureLike',
  '50000010': 'dutyFreeLike',
}

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
    productNo: Array<string>,
    exist: boolean
  ): Promise<any> {

    const userRecord = await this.userModel.findOne({ userName: config.personaName });
    const productRecord = await this.productModel.findOne({ productNo: productNo[productNo.length - 1] })

    if (!userRecord) throw new NotFoundError('User is not exist');
    if (!productRecord) throw new NotFoundError('Product is not exist');

    const category1Id = categoryCode[productNo[0]];


    console.log(userRecord);

    // let users = userRecord.toObject();
    // let products = productRecord.toObject();

    // try {
    //   const category1Id = categoryCode[productNo[0]];
    //   if (exist) {
    //     userRecord[category1Id] = users[category1Id].filter((l: any) => (l !== productNo));
    //     return await userRecord.save();
    //   }

    //   let userLike: UserLike;
    //   userLike.id = productNo[productNo.length - 1];
    //   userLike.category = productNo[0];
    //   userLike.modelName = products.name;
    //   userLike.price = products.salePrise;
    //   userLike.updateDe = new Date();

    //   users[category1Id].push(userLike);

    //   userRecord[category1Id] = users[category1Id];
    //   await userRecord.save();

    // } catch (e) {
    //   this.logger.error(e);
    //   throw e;
    // }

    // return await this.addWeight(productNo[productNo.length - 1], config.likeWeight);
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