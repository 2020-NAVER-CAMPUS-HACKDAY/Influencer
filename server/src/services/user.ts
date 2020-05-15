import { Service, Inject, ContainerInstance } from 'typedi';
import { Model, Document } from 'mongoose';
import winston from 'winston';
import { IUserModel } from '../models/user';

export interface IUser {
  name: string
}

@Service()
export default class UserService {
  private userModel: Model<IUserModel>;
  private logger: winston.Logger;

  constructor(@Inject() container: ContainerInstance) {
    this.userModel = container.get('userModel');
    this.logger = container.get('logger');
  }

  public async list(
    limit: string,
  ): Promise<{ users: IUser[] }> {
    try {
      const take = parseInt(limit || '10', 10);
      const userRecords = await this.userModel
        .find()
        .limit(take);

      console.log(userRecords); // []
      console.log(typeof userRecords); // object
      console.log(userRecords[0]._id); // undefined error!!

      const users = userRecords.map((user) => user.toObject());
      return { users };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
