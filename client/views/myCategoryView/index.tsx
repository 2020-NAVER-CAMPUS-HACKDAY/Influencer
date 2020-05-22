import React, { FC, useState } from 'react';
import MainHeader from 'components/Main/MainHeader';
import SelectCategory from 'components/SelectCategory';
import { Category } from 'interfaces/category';
import { CategoryProps } from 'redux/ducks/category';
import { PayloadActionCreator } from 'typesafe-actions';
import Router from 'next/router';

interface MyCategoryViewProps extends CategoryProps {
  categoryData: Category[];
  categoryArray: Category[];
  setCategory: PayloadActionCreator<'category/SET_CATEGORY', Category | Category[]>;
}

const MyCategoryView: FC<MyCategoryViewProps> = (props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { categoryData, setCategory } = props;

  const categoryAddHandler = (newCategory: Category): void => {
    setCategories([
      ...categories,
      newCategory,
    ]);
  };

  const categoryDeleteHandler = (id: string): void => {
    const newCategories = categories.filter((category) => category.categoryId !== id);
    setCategories(newCategories);
  };

  const setCategoryArray = (): void => {
    setCategory(categories);
    // TODO(jominjimail): check the categoryArray size
    Router.push('/my/category/rank');
  };

  return (
    <MainHeader>
      {/* TODO(jominjimail): for easy developing */}
      <button onClick={setCategoryArray}>다음 페이지</button>
      <SelectCategory
        categoryData={categoryData}
        categoryAddHandler={categoryAddHandler}
        categoryDeleteHandler={categoryDeleteHandler}
      />
    </MainHeader>
  );
};

export default MyCategoryView;
