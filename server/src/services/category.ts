import { Service, Inject, ContainerInstance } from 'typedi';
import { Model, Document } from 'mongoose';
import winston from 'winston';
import { ICategory } from '../interfaces/category';
import { ICategoryModel } from '../models/category';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from '../modules/errors';

@Service()
export default class CategoryService {
  private categoryModel: Model<ICategoryModel>;
  private logger: winston.Logger;

  constructor(@Inject() container: ContainerInstance) {
    this.categoryModel = container.get('categoryModel');
    this.logger = container.get('logger');
  }

  public async list(
      limit: string,
  ): Promise<{ categories: ICategory[] }> {
    try {
      const take = parseInt(limit || '10', 10);
      const categoryRecords = await this.categoryModel
        .find()
        .limit(take);

      console.log(categoryRecords);
      console.log(typeof categoryRecords);
      console.log(categoryRecords[0]._id);

      const categories = categoryRecords.map((category) => category.toObject());
      return { categories };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
