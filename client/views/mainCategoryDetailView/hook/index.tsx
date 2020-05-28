import { useEffect, useState } from 'react';
import { Category } from 'interfaces/category';
import { AxiosResponse } from 'axios';
import { getCategoryDataForCategoryId } from 'network/categoryApi';

export const useCategoryDetail = (categoryid: string | string[]) => {
  const [category, setcategory] = useState<Category>();
  const [children, setChildren] = useState<Category[]>([]);

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      await getCategoryDataForCategoryId(categoryid)
        .then((response: AxiosResponse<Category>) => {
          console.log('DB');
          console.log(response.data);
          setcategory(response.data);
        })
        .catch((error) => error);
    };
    fetch();
  }, [categoryid, category]);

  return {
    category,
    children,
  };
};
