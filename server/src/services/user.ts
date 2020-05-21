import { Service, Inject, ContainerInstance } from 'typedi'
import { Model, Document } from 'mongoose';
import winston from 'winston';
import {
  IUser,
  IProduct,
  ProductVerGridView,
  FetchProductForGridView,
} from '../interfaces';
import config from '../config';
import {
  NotFoundError
} from '../modules/errors';

@Service()
export default class UserService {
  private userModel: Model<IUser & Document>;
  private productModel: Model<IProduct & Document>;
  private logger: winston.Logger;

  constructor( @Inject() container: ContainerInstance ) {
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

      return new Promise(async ( resolve, reject ) => {
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

      return new Promise(async ( resolve, reject ) => {
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

      return new Promise(async ( resolve, reject ) => {
        let products = productRecord.toObject();
        let users = userRecord.toObject();

        const idx = users.prefer.findIndex(( p: any, i: any ) => {
          p.productNo === parseInt(productNo);
          return i;
        });

        resolve({ userRecord, products, users, idx, weight });
      });
    };

    const addWeight = async ( { userRecord, products, users, idx, weight }: any ) => {
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

    const handleClicklogError = ( e: Error ) => {
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
          users.like[wholeCategoryId[0]].likeList.filter(( l: string ) => (l !== productNo));

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
  ): Promise<{ [index: string]: number[] }> {
    const userLikeRecord =
      await this.userModel
        .findOne({ userName: config.personaName })
        .select('-prefer -updatedAt -createdAt -userName -_id');

    if (!userLikeRecord) throw new NotFoundError('User is not exist');

    try {
      const uesrs = userLikeRecord.toObject();
      let result: { [index: string]: number[] } = {};

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

  public async productListGet(idArray: string[]): Promise<{ products: ProductVerGridView[] }> {
    try {
      const productArrayRecord = await this.productModel.find()
        .in('_id', idArray).limit(4);

      if (!productArrayRecord) {
        throw new NotFoundError('Product is not exist');
      }

      const fetchedProducts = productArrayRecord.map(( record ) => record.toObject());

      const products: ProductVerGridView[] = fetchedProducts.map(( product: FetchProductForGridView ) => {
        return {
          productId: product._id,
          imageLink: product.productImages[0].url,
          category: product.category.category1Id,
          likeDate: product.modDate,
        }
      })

      return { products };

    } catch(e) {
      this.logger.error(e);
      throw e;
    }
  }

  // TODO(daeun): add user query
  public async selectLikeListForGridView(): Promise<{ [index: string]: ProductVerGridView[] }> {
    try {
      const userLikeList: { [index: string]: number[] } = await this.selectLikeList();

      let result: { [index: string]: ProductVerGridView[] } = {};

      for (let category of Object.keys(userLikeList)) {
        const CategoryLikeProductList = await this.productListGet(
          userLikeList[category]
            .map(( likeProductId ) => likeProductId.toString()));
        result[category] = CategoryLikeProductList.products;
      }

      return result;

    } catch(e) {
      this.logger.error(e);
      throw e;
    }
  }
}
