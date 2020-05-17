import React, { useState } from 'react';
import MainHeader from 'components/Main/MainHeader';
import { myCategoryViewDataArray } from 'views/myCategoryView/myCategoryDummyData';
import SelectCategory from 'components/SelectCategory';

interface Category{
  id: string;
  name: string;
}

interface MyCategoryViewProps {
  data: string;
}

const MyCategoryView: React.FC<MyCategoryViewProps> = (props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const dummyData: Category[] = myCategoryViewDataArray;

  const categoryAddHandler = (id: string, name: string) => {
    setCategories([
      ...categories,
      {
        id,
        name,
      },
    ]);
  };

  const categoryDeleteHandler = (id: string) => {
    const newCategories = categories.filter((category) => category.id !== id);
    setCategories(newCategories);
  };

  return (
    <MainHeader>
      <SelectCategory
        dummyData={dummyData}
        categoryAddHandler={categoryAddHandler}
        categoryDeleteHandler={categoryDeleteHandler}
      />
    </MainHeader>
  );
};

export default MyCategoryView;
