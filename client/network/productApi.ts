import axios, { AxiosResponse } from 'axios';
import {
  ProductDataProps, ProductDetailProps, LikeListProductProps,
} from 'redux/ducks/Interface';
import {
  PRODUCT_PAGE_API,
  PAGE_ADD,
  LIMIT_ADD,
  PRODUCT_LIMIT,
  LIKE_LIST_API,
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

export const getLikeListData = (pageId): Promise<AxiosResponse <(
Error |
LikeListProductProps)>> => axios.get(
  `${process.env.LOCAL_URL}${LIKE_LIST_API}${PAGE_ADD}${pageId}`,
);
