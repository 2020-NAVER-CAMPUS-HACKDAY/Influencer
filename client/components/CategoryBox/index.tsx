import React, { FC, useState } from 'react';
import useStyles from 'components/CategoryBox/styles';
import { Category } from 'interfaces/category';

interface CategoryBoxProps {
  category: Category;
  categoryAddHandler: (category: Category) => void;
  categoryDeleteHandler: (id: string) => void;
}
const CategoryBox: FC<CategoryBoxProps> = (props) => {
  const {
    category, categoryAddHandler, categoryDeleteHandler,
  } = props;
  const { categoryId, value } = category;
  const [checked, setChecked] = useState(false);
  const classes = useStyles();

  const toggleChecked = (): void => {
    if (checked) {
      setChecked(false);
      categoryDeleteHandler(categoryId);
    } else {
      setChecked(true);
      categoryAddHandler(category);
    }
  };

  return (
    <div>
      <button key={categoryId} onClick={toggleChecked}
        className={checked ? classes.active : classes.inactive}>
        {`${value.wholeCategoryName}`}
      </button>
    </div>
  );
};

export default CategoryBox;
