import axios, { AxiosResponse } from 'axios';
import { CategoryDataProps, CategoryChildrenProps } from 'interfaces/category';

export const getCategoryInfo = (categoryId: string | string[]): Promise<AxiosResponse <(
Error
| CategoryDataProps)>> => axios.get(
  `${process.env.SERVER_URL}categories/${categoryId}`,
);

export const getCategoryChildren = (categoryId: string | string[]): Promise<AxiosResponse <(
Error
| CategoryChildrenProps)>> => axios.get(
  `${process.env.SERVER_URL}categories/children/${categoryId}`,
);
