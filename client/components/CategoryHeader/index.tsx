import React, { FC } from 'react';
import { Category } from 'interfaces/category';

interface CategoryHeaderProps {
  categoryData: Category[];
}

const CategoryHeader: FC<CategoryHeaderProps> = (props) => {
  const { categoryData } = props;

  const setCategory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const categoryId: string = event.currentTarget.value;
  };

  const categoryElements = categoryData.map((category) => {
    const { categoryId } = category;
    return (
      <button
        key={categoryId}
        onClick={setCategory}
        value={categoryId}>{category.value.categoryName}
      </button>
    );
  });

  return (
    <div>
      {categoryElements}
    </div>
  );
};

export default CategoryHeader;
