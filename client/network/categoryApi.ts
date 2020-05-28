import axios, { AxiosResponse } from 'axios';
import { Category } from 'interfaces/category';

export const getCategoryDataForCategoryId = (categoryId): Promise<AxiosResponse <(
Error
| Category)>> => axios.get(
  `${process.env.SERVER_URL}categories/${categoryId}`,
);
