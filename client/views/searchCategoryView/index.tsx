import React, { FC, useEffect, useState } from 'react';
import MainHeader from 'components/Main/MainHeader';
import { useRouter } from 'next/router';
import { AxiosResponse } from 'axios';
import { Category, CategoryDataProps } from 'interfaces/category';
import { getCategoryInfo } from 'network/categoryApi';

const SearchCategoryView: FC = (props) => {
  const [categoryInfo, setCategoryInfo] = useState<Category>();
  const router = useRouter();
  const { catId } = router.query;

  useEffect(() => {
    // baseQuery is undefined when catId is not lastLevel
    if (catId === undefined) return;
    const fetch = async (): Promise<void> => {
      await getCategoryInfo(catId)
        .then(
          (response: AxiosResponse<CategoryDataProps>) => {
            setCategoryInfo(response.data.category);
          },
        );
    };
    fetch();
  }, [catId]);

  return (
    <MainHeader>
      <div>
        This is searchCategoryView Page
      </div>
      {catId}
      {categoryInfo.value.wholeCategoryId}
    </MainHeader>
  );
};

export default SearchCategoryView;
