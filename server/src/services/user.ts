import { Service, Inject, ContainerInstance } from 'typedi'
import { Model, Document } from 'mongoose';
import winston from 'winston';
import { IUser, IProduct, UserLike } from '../interfaces';
import config from '../config';
const ContentBasedRecommender = require('content-based-recommender');
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
    wholeCategoryId: Array<string>,
    exist: boolean
  ): Promise<any> {

    const userRecord = await this.userModel.findOne({ userName: config.personaName });
    const productRecord = await this.productModel.findOne({ productNo: productNo })

    if (!userRecord) throw new NotFoundError('User is not exist');
    if (!productRecord) throw new NotFoundError('Product is not exist');

    let users = userRecord.toObject();
    let products = productRecord.toObject();

    try {

      if (exist) {
        users.like[wholeCategoryId[0]].likeList =
          users.like[wholeCategoryId[0]].likeList.filter((l: string) => (l !== productNo));

        userRecord.like = users.like
        return await userRecord.save();
      }

      users.like[wholeCategoryId[0]].likeList.push(productNo);

      userRecord.like = users.like;
      await userRecord.save();

    } catch (e) {
      this.logger.error(e);
      throw e;
    }

    return await this.addWeight(productNo, config.likeWeight);
  }

  public async selectLikeList(
    page: string
  ): Promise<any> {
    const userLikeRecord =
      await this.userModel
        .findOne({ userName: config.personaName })
        .select('-prefer -updatedAt -createdAt -userName -_id');

    if (!userLikeRecord) throw new NotFoundError('User is not exist');

    try {
      const uesrs = userLikeRecord.toObject();
      let result: { [index: string]: Object } = {};

      for (let categoryId of Object.keys(uesrs.like)) {
        if (uesrs.like[categoryId].likeList.length < 1) {
          result[uesrs.like[categoryId].categoryName] = [];

        } else {
          let productList = [];

          for (let like of uesrs.like[categoryId].likeList.slice(parseInt(page) * 10, parseInt(page) * 10 + 10)) {
            const product =
              await this.productModel
                .findOne({ productNo: like })
                .select('productNo name productImages category salePrice saleStartDate')
            productList.push(product);
          }

          result[uesrs.like[categoryId].categoryName] = productList;
        }
      }
      return result;

    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async recommendItem(
    page: string
  ): Promise<any> {

    const userRecord = await this.userModel.find();

    if (!userRecord) throw new NotFoundError('User is not exist!');


    const recommender = new ContentBasedRecommender({
      minScore: 0.1,
      maxSimilarDocuments: 100
    });

    try {
      const documents = userRecord.map((user: any) => ({ id: user.userName, content: user.prefer }));
      console.log(documents);

      recommender.train(documents);

      const result = recommender.getSimilarDocuments(config.personaName, 0, 10);
      console.log(result);
      return result;


    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}