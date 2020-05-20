import axios, { AxiosResponse } from 'axios';
import { ProductDataProps, ProductDetailProps } from 'redux/ducks/productInterface';
import {
  PRODUCT_PAGE_API,
  PAGE_ADD,
  LIMIT_ADD,
  PRODUCT_LIMIT,
} from 'constant';

export const getProductDataArray = (pageId): Promise<AxiosResponse <(
Error
| ProductDataProps[])>> => axios.get(
  `${process.env.SERVER_URL}${PRODUCT_PAGE_API}${PAGE_ADD}${pageId}${LIMIT_ADD}${PRODUCT_LIMIT}`,
);
export const getProductDataForProductId = (productId): Promise<AxiosResponse <(
Error |
ProductDetailProps)>> => axios.get(
  `${process.env.SERVER_URL}${PRODUCT_PAGE_API}${productId}`,
);
