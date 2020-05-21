import React, { FC } from 'react';
import { Category } from 'components/SelectCategory/types';
import useStyles from 'components/CategoryRankBox/styles';

interface CategoryBoxProps {
  category: Category;
  rankNum: number;
}
const CategoryRankBox: FC<CategoryBoxProps> = (props) => {
  const { category, rankNum } = props;
  const classes = useStyles();

  return (
    <div className={classes.gridItem}>
      <div className={classes.rankNum}>{rankNum}</div>
      <div className={classes.gridItemContent}>
        {category.value.wholeCategoryName}
      </div>
    </div>
  );
};

export default CategoryRankBox;
