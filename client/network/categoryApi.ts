import axios, { AxiosResponse } from 'axios';
import { CategoryDataProps } from 'interfaces/category';

export const getCategoryInfo = (categoryId: string | string[]): Promise<AxiosResponse <(
Error
| CategoryDataProps)>> => axios.get(
  `${process.env.SERVER_URL}categories/${categoryId}`,
);
