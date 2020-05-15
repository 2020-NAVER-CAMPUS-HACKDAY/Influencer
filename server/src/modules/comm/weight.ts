import config from '../../config';

import userModel from '../../models/user'
import productModel from '../../models/product';
import logger from '../../loaders/logger';

export function selectProduct(
  productNo: string
): Promise<any> {

  return new Promise(async (resolve, reject) => {
    const productRecord = await productModel.findOne({ _id: productNo });
    if (!productRecord) {
      reject('Product is not exist');
    }
    resolve({ productNo, productRecord });
  });
}

export function selectUser(
  { productNo, productRecord }: any
): Promise<any> {

  return new Promise(async (resolve, reject) => {
    const userRecord = await userModel.findOne({ userName: config.personaName });
    if (!userRecord) {
      reject('User is not exist');
    }
    resolve({ productNo, productRecord, userRecord });
  });
}

export function checkExist(
  { productNo, productRecord, userRecord }: any
): Promise<any> {

  return new Promise(async (resolve, reject) => {
    let products = productRecord.toObject();
    let users = userRecord.toObject();

    const idx = users.prefer.findIndex((p: any, i: any) => {
      p.productNo === parseInt(productNo);
      return i;
    });

    resolve({ userRecord, products, users, idx });
  });
}

export async function addWeight({ userRecord, products, users, idx }: any) {
  if (idx < 0) {
    const result = await userRecord.update({
      $push: {
        prefer: {
          productNo: products.productNo,
          categoryId: products.category.categoryId,
          rating: config.clicklogWeight
        }
      }
    });

    return result
  }

  if (users.prefer[idx].rating + config.clicklogWeight <= 5) {
    users.prefer[idx].rating += config.clicklogWeight;

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
