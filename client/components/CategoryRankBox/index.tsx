import React from 'react';
import { Category } from 'components/SelectCategory/types';

interface CategoryBoxProps {
  category: Category;
}
const CategoryRankBox: React.FunctionComponent<CategoryBoxProps> = (props) => {
  const { category } = props;
  const { _id, value } = category;

  return (
    <div>
      <button key={_id}>
        {`${value.wholeCategoryName}`}
      </button>
    </div>
  );
};

export default CategoryRankBox;
