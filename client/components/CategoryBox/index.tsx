import React, { useState } from 'react';
import useStyles from 'components/CategoryBox/styles';
import { Category } from '../SelectCategory/types';

interface CategoryBoxProps {
  category: Category;
  categoryAddHandler: (category: Category) => void;
  categoryDeleteHandler: (id: string) => void;
}
const CategoryBox: React.FunctionComponent<CategoryBoxProps> = (props) => {
  const {
    category, categoryAddHandler, categoryDeleteHandler,
  } = props;
  const { _id, value } = category;
  const [checked, setChecked] = useState(false);
  const classes = useStyles();

  const toggleChecked = (): void => {
    if (checked) {
      setChecked(false);
      categoryDeleteHandler(_id);
    } else {
      setChecked(true);
      categoryAddHandler(category);
    }
  };

  return (
    <div>
      <button key={_id} onClick={toggleChecked} className={classes.button}>
        {`${value.wholeCategoryName}`}
      </button>
    </div>
  );
};

export default CategoryBox;
