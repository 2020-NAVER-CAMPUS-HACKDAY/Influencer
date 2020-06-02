import axios, { AxiosResponse } from 'axios';
import { Product, ProductDetail, ProductDucksProps } from 'interfaces/product';
import { LikeListProduct } from 'interfaces/likeList';
import { FetchGridViewProps } from 'components/LikeList/LikeGridView/interface';
import {
  PRODUCT_PAGE_API,
  PAGE_ADD,
  LIMIT_ADD,
  PRODUCT_LIMIT,
  LIKE_LIST_API,
  GRID_VIEW,
} from 'constant';

export const getProductDataArray = (
  pageId,
): Promise<AxiosResponse<Error | Product[]>> =>
  axios.get(
    `${process.env.SERVER_URL}${PRODUCT_PAGE_API}${PAGE_ADD}${pageId}${LIMIT_ADD}${PRODUCT_LIMIT}`,
  );

export const getProductDataForProductId = (
  productId,
): Promise<AxiosResponse<Error | ProductDetail>> =>
  axios.get(`${process.env.SERVER_URL}${PRODUCT_PAGE_API}${productId}`);

export const getLikeListData = (
  pageId,
): Promise<AxiosResponse<Error | LikeListProduct>> =>
  axios.get(`${process.env.SERVER_URL}${LIKE_LIST_API}${PAGE_ADD}${pageId}`);

export const getLikeListDataVerGridView = (): Promise<
  AxiosResponse<Error | FetchGridViewProps>
> => axios.get(`${process.env.SERVER_URL}${LIKE_LIST_API}${GRID_VIEW}`);
