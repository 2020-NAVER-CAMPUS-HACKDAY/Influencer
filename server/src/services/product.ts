import { Service, Inject, ContainerInstance } from 'typedi';
import { Model, Document } from 'mongoose';
import winston from 'winston';
import { IProduct, IProductDTO } from '../interfaces';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from '../modules/errors';

@Service()
export default class ProductService {
  private productModel: Model<IProduct & Document>;
  private logger: winston.Logger;

  constructor(@Inject() container: ContainerInstance) {
    this.productModel = container.get('productModel');
    this.logger = container.get('logger');
  }

  public async getProducts(
    page: string,
    limit: string
  ): Promise<{ products: IProductDTO[] }> {
    try {
      const take = parseInt(limit || '10', 10);
      const skip = take * (parseInt(page || '1', 10) - 1);
      if (Number.isNaN(take) || Number.isNaN(skip)) {
        throw new BadRequestError('take and limit must be number');
      }

      const productRecords = await this.productModel
        .find()
        .limit(take)
        .skip(skip);

      const products = productRecords
        .map((record) => record.toObject())
        .map((product) => ({
          productNo: product.productNo,
          name: product.name,
          category: product.category,
          salePrice: product.salePrice,
          productImages: product.productImages,
          productInfoProvidedNoticeView:
            product.productInfoProvidedNoticeView.basic,
        }));

      return { products };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getProduct(id: string): Promise<{ product: IProductDTO }> {
    try {
      const productRecord = await this.productModel.findOne({ _id: id });
      if (!productRecord) {
        throw new NotFoundError('Product is not exist');
      }
      const product = productRecord.toObject();

      return {
        product: {
          productNo: product.productNo,
          name: product.name,
          category: product.category,
          salePrice: product.salePrice,
          productImages: product.productImages,
          productInfoProvidedNoticeView:
            product.productInfoProvidedNoticeView.basic,
        },
      };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async create(productDTO: IProductDTO): Promise<{ product: IProduct }> {
    try {
      this.logger.silly('Creating user db record');
      const productRecord = await this.productModel.create({
        name: productDTO.name,
      });

      if (!productRecord) {
        throw new ConflictError('User cannot be created');
      }

      const product = productRecord.toObject();
      return { product };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public replace() {}

  public update() {}

  public remove() {}
}
