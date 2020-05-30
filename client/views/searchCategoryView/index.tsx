import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import MainHeader from 'components/Main/MainHeader';
import { useRouter } from 'next/router';
import { AxiosResponse } from 'axios';
import { Category, CategoryDataProps, CategoryChildrenProps } from 'interfaces/category';
import { getCategoryInfo, getCategoryChildren } from 'network/categoryApi';

const SearchCategoryView: FC = (props) => {
  const router = useRouter();
  /*
  baseQuery -> undefined when catId is not lastLevel
  baseQuery -> "" when catId is lastLevel
   */
  const { catId, baseQuery } = router.query;
  const [categoryInfo, setCategoryInfo] = useState<Category>();
  const [categoryChildren, setCategoryChildren] = useState<Category[]>([]);

  useEffect(() => {
    if (catId === undefined) return;
    console.log('here1');
    const fetch = async (): Promise<void> => {
      await getCategoryInfo(catId)
        .then(
          (response: AxiosResponse<CategoryDataProps>) => {
            console.log(response.data.category);
            setCategoryInfo(response.data.category);
          },
        );
    };
    const fetch2 = async (): Promise<void> => {
      await getCategoryChildren(catId)
        .then(
          (response: AxiosResponse<CategoryChildrenProps>) => {
            setCategoryChildren(response.data.categories);
          },
        );
    };
    fetch();
    if (baseQuery !== undefined) return;
    fetch2();
  }, [catId]);

  // useEffect(() => {
  //   if (catId === undefined) return;
  //   console.log(lastCategory.current);
  //   if (lastCategory.current) return;
  //   console.log('here2');
  //   const fetch2 = async (): Promise<void> => {
  //     await getCategoryChildren(catId)
  //       .then(
  //         (response: AxiosResponse<CategoryChildrenProps>) => {
  //           setCategoryChildren(response.data.categories);
  //         },
  //       );
  //   };
  //   fetch2();
  // }, [catId]);

  return (
    <MainHeader>
      <div>
        This is searchCategoryView Page
      </div>
      {baseQuery}
      <div>현재</div>
      {categoryInfo && categoryInfo.value.wholeCategoryId}
      <div>자식</div>
      {categoryChildren.map((child) => <div>{child.categoryId}</div>)}
    </MainHeader>
  );
};

export default SearchCategoryView;
