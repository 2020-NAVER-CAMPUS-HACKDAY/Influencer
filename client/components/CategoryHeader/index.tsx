import React, { FC } from 'react';
import { Category } from 'interfaces/category';

interface CategoryHeaderProps {
  categoryData: Category[];
}

const CategoryHeader: FC<CategoryHeaderProps> = (props) => {
  const { categoryData } = props;

  const categoryElements = categoryData.map((category) => {
    const { categoryId } = category;
    return (
      <div key={categoryId}>{category.value.categoryName}</div>
    );
  });

  return (
    <button>
      {categoryElements}
    </button>
  );
};

export default CategoryHeader;
