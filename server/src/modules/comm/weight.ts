import config from '../../config';

import userModel from '../../models/user'
import productModel from '../../models/product';
import logger from '../../loaders/logger';

export function selectProduct(
  productNo: string,
  weight: number
): Promise<any> {

  return new Promise(async (resolve, reject) => {
    const productRecord = await productModel.findOne({ _id: productNo });
    if (!productRecord) {
      reject('Product is not exist');
    }
    resolve({ productNo, productRecord, weight });
  });
}

export function selectUser(
  { productNo, productRecord, weight }: any
): Promise<any> {

  return new Promise(async (resolve, reject) => {
    const userRecord = await userModel.findOne({ userName: config.personaName });
    if (!userRecord) {
      reject('User is not exist');
    }
    resolve({ productNo, productRecord, userRecord, weight });
  });
}

export function checkExist(
  { productNo, productRecord, userRecord, weight }: any
): Promise<any> {

  return new Promise(async (resolve, reject) => {
    let products = productRecord.toObject();
    let users = userRecord.toObject();

    const idx = users.prefer.findIndex((p: any, i: any) => {
      p.productNo === parseInt(productNo);
      return i;
    });

    resolve({ userRecord, products, users, idx, weight });
  });
}

export async function addWeight({ userRecord, products, users, idx, weight }: any) {
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
}

export function handleClicklogError(e: Error) {
  logger.error(e);
  throw e;
}
