import { Service, Inject, ContainerInstance } from 'typedi';
import { Model, Document } from 'mongoose';
import winston from 'winston';
import { IProduct, IProductDTO, IUser, CategoryLike } from '../interfaces';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from '../modules/errors';
import { IProductforView } from '../interfaces/product';
import config from '../config';

@Service()
export default class ProductService {
  private productModel: Model<IProduct & Document>;
  private userModel: Model<IUser & Document>;
  private logger: winston.Logger;

  constructor(@Inject() container: ContainerInstance) {
    this.productModel = container.get('productModel');
    this.logger = container.get('logger');
    this.userModel = container.get('userModel');
  }

  public async getProducts(
    page: string = '10',
    limit: string = '1',
  ): Promise<{ products: IProductDTO[] }> {
    try {
      const take = parseInt(limit, 10);
      const skip = take * (parseInt(page, 10) - 1);
      if (Number.isNaN(take) || Number.isNaN(skip)) {
        throw new BadRequestError('take and limit must be number');
      }
      if (take > 30) {
        throw new BadRequestError('limit cannot exceed 30');
      }

      const productRecords = await this.productModel
        .find()
        .sort({ modDate: -1 })
        .limit(take)
        .skip(skip);

      let products: IProductDTO[] = productRecords
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

      await this.addLikeField(products);

      return { products };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async listCategory(
    id: string,
    page: string = '1',
    limit: string = '10',
  ): Promise<{ products: IProductforView[] }> {
    try {
      const take = parseInt(limit, 10);
      const skip = take * (parseInt(page, 10) - 1);
      if (Number.isNaN(take) || Number.isNaN(skip)) {
        throw new BadRequestError('take and limit must be number');
      }

      const productRecords = await this.productModel
        .find({ 'category.categoryId': id })
        .select({ name: 1, productImages: 1, salePrice: 1 })
        .limit(take)
        .skip(skip);
      const products = productRecords
        .map((record) => record.toObject())
        .map((product) => ({
          productId: product._id,
          productName: product.name,
          productImages: product.productImages[0],
          salePrice: Number(product.salePrice),
        }));
      return { products };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getProduct(id: number): Promise<{ product: IProductDTO }> {
    try {
      const productRecord = await this.productModel.findOne({
        productNo: id,
      });
      if (!productRecord) {
        throw new NotFoundError('Product is not exist');
      }
      let products: IProductDTO[] = [productRecord.toObject()];
      await this.addLikeField(products);
      const product = products[0];

      return {
        product: {
          productNo: product.productNo,
          name: product.name,
          category: product.category,
          salePrice: product.salePrice,
          productImages: product.productImages,
          productInfoProvidedNoticeView:
            product.productInfoProvidedNoticeView.basic,
          like: product.like,
        },
      };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async addLikeField(products: IProductDTO[]): Promise<void> {
    try {
      const userLikeRecord = await this.userModel
        .findOne({
          userName: config.personaName,
        })
        .select({ like: 1 });

      if (!userLikeRecord) {
        throw Error();
      }

      const userLike = (await userLikeRecord.toObject().like) as CategoryLike[];
      const likeList = Object.values(userLike).reduce(
        (acc: number[], el: CategoryLike) => {
          return [...acc, ...el.likeList];
        },
        [],
      );
      const likeSet = new Set<number>(likeList);

      for (const product of products) {
        product.like = likeSet.has(product.productNo as number) ? true : false;
      }
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
