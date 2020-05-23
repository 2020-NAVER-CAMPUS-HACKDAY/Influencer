import React, { FC } from 'react';
import MainHeader from 'components/Main/MainHeader';
import CategoryHeader from 'components/CategoryHeader';
import { Category } from 'interfaces/category';

interface MyCategoryViewProps {
  categoryData: Category[];
}

const MainCategoryView: FC<MyCategoryViewProps> = (props) => {
  const { categoryData } = props;

  return (
    <MainHeader>
      <CategoryHeader
        categoryData={categoryData}
      />
    </MainHeader>
  );
};

export default MainCategoryView;
