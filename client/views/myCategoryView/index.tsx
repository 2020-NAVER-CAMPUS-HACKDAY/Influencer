import React, { useState } from 'react';
import MainHeader from 'components/Main/MainHeader';
import SelectCategory from 'components/SelectCategory';
import { Category } from 'components/SelectCategory/types';
import { CategoryProps } from 'redux/ducks/category';
import { PayloadActionCreator } from 'typesafe-actions';
import Router from 'next/router';

interface MyCategoryViewProps extends CategoryProps {
  categoryData: Category[];
  categoryArray: Category[];
  setCategory: PayloadActionCreator<'category/SET_CATEGORY', Category | Category[]>;
}

const MyCategoryView: React.FC<MyCategoryViewProps> = (props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { categoryData, setCategory } = props;

  const categoryAddHandler = (newCategory: Category): void => {
    setCategories([
      ...categories,
      newCategory,
    ]);
  };

  const categoryDeleteHandler = (id: string): void => {
    // TODO(jominjimail): remove this lint error
    // eslint-disable-next-line no-underscore-dangle
    const newCategories = categories.filter((category) => category._id !== id);
    setCategories(newCategories);
  };

  const setCategoryArray = (): void => {
    setCategory(categories);
    // TODO(jominjimail): check the categoryArray size
    Router.push('/my/category/rank');
  };

  return (
    <MainHeader>
      <SelectCategory
        categoryData={categoryData}
        categoryAddHandler={categoryAddHandler}
        categoryDeleteHandler={categoryDeleteHandler}
      />
      <button onClick={setCategoryArray}>다음 페이지</button>
    </MainHeader>
  );
};

export default MyCategoryView;
