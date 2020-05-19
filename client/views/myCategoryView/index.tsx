import React, { useState } from 'react';
import MainHeader from 'components/Main/MainHeader';
import SelectCategory from 'components/SelectCategory';
import { Category } from 'components/SelectCategory/types';

interface MyCategoryViewProps {
  categoryData: Category[];
}

// TODO(jominjimail): data management with redux or hook
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
    // TODO(jominjimail): remove this lint error
    // eslint-disable-next-line no-underscore-dangle
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
