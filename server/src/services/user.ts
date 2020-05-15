import { Service, Inject, ContainerInstance } from 'typedi'
import { Model, Document } from 'mongoose';
import winston from 'winston';
import { IUser, IProduct } from '../interfaces';
import config from '../config';
import { selectProduct, selectUser, checkExist, addWeight, handleClicklogError } from '../modules/common/weight';
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

    return await
      selectProduct(productNo, config.clicklogWeight)
        .then(selectUser)
        .then(checkExist)
        .then(addWeight)
        .catch(handleClicklogError);
  }

  public async setLike(
    productNo: string,
    exist: boolean
  ): Promise<any> {
    const userRecord = await this.userModel.findOne({ userName: config.personaName });
    if (!userRecord) {
      throw new NotFoundError('User is not exist');
    }

    let users = userRecord.toObject();

    if (exist) {
      userRecord.like = users.like.filter((l: any) => (l !== productNo));
      return await userRecord.save();
    }

    users.like.push(productNo);

    userRecord.like = users.like;
    await userRecord.save();

    return await
      selectProduct(productNo, config.clicklogWeight)
        .then(selectUser)
        .then(checkExist)
        .then(addWeight)
        .catch(handleClicklogError);
  }

  public async selectLikeList(
  ): Promise<any> {
    const userLikeRecord = await this.userModel.findOne({ userName: config.personaName }).select('like');
    let userLikeList = userLikeRecord.toObject();

    const result = userLikeList.map(async (like: any) => await this.productModel.findOne({ productNo: like }));
    console.log(result);

  }
}