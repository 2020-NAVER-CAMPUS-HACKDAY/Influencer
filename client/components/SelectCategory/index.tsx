import React, { FC } from 'react';
import CategoryBox from 'components/CategoryBox';
import useStyles from 'components/SelectCategory/styles';
import { Category } from 'components/SelectCategory/types';

interface SelectCategoryProp {
  categoryData: Category[];
  categoryAddHandler: (category: Category) => void;
  categoryDeleteHandler: (id: string) => void;
}

const SelectCategory: FC<SelectCategoryProp> = (props) => {
  const { categoryData, categoryAddHandler, categoryDeleteHandler } = props;
  const classes = useStyles();

  const categoryElements = categoryData.map((category) => {
    const { _id } = category;
    return (
      <CategoryBox
        key={_id}
        category={category}
        categoryAddHandler={categoryAddHandler}
        categoryDeleteHandler={categoryDeleteHandler}
      />
    );
  });

  return (
    <div className={classes.container}>
      {categoryElements}
    </div>
  );
};

export default SelectCategory;
