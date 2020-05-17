import { Service, Inject, ContainerInstance } from 'typedi';
import { Model, Document } from 'mongoose';
import winston from 'winston';
import { ICategory } from '../interfaces/category';
import { ICategoryModel } from '../models/category';
import {
  BadRequestError,
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
      page: string,
  ): Promise<{ categories: ICategory[] }> {
    try {
      const take = parseInt(limit || '10', 10);
      const skip = take * (parseInt(page || '1', 10) - 1);
      if (Number.isNaN(take) || Number.isNaN(skip)) {
        throw new BadRequestError('take, limit and categoryLevel must be number');
      }
      const categoryRecords = await this.categoryModel
        .find()
        .limit(take)
        .skip(skip);

      const categories = categoryRecords.map((category) => category.toObject());
      return { categories };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async get(id: string): Promise<{ category: ICategory }> {
      try {
        const categoryRecord = await this.categoryModel.findOne({ _id: id });
        if (!categoryRecord) {
          throw new NotFoundError('Product is not exist');
        }
        const category = categoryRecord.toObject();
        return { category };
      } catch (e) {
        this.logger.error(e);
        throw e;
      }
    }
}