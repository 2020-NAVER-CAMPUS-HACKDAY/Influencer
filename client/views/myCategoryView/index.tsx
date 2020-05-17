import React, { useState } from 'react';
import MainHeader from 'components/Main/MainHeader';
import SelectCategory from 'components/SelectCategory';
import { Category } from 'components/SelectCategory/types';

interface MyCategoryViewProps {
  categoryData: Category[];
}

const MyCategoryView: React.FC<MyCategoryViewProps> = (props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { categoryData } = props;

  const categoryAddHandler = (newCategory: Category): void => {
    setCategories([
      ...categories,
      newCategory,
    ]);
  };

  const categoryDeleteHandler = (id: string): void => {
    const newCategories = categories.filter((category) => category._id !== id);
    setCategories(newCategories);
  };

  return (
    <MainHeader>
      <SelectCategory
        categoryData={categoryData}
        categoryAddHandler={categoryAddHandler}
        categoryDeleteHandler={categoryDeleteHandler}
      />
    </MainHeader>
  );
};

export default MyCategoryView;
