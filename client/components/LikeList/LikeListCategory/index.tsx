import React, { FC } from 'react';
import { LikeListCategoryProps } from 'components/LikeList/LikeGridView/interface';
import Label from 'components/Common/Label';
import { AppColor, Category } from 'constant';
import { orderBy, uniq } from 'lodash';
import useStyles from 'components/LikeList/LikeListCategory/styles';

const LikeListCategory: FC<LikeListCategoryProps> = (props) => {
  const { itemArray, handleCategoryClick, clickedCategory } = props;
  const classes = useStyles();
  const categoryArray = orderBy(uniq(itemArray.map((item) => item.category)), ['asc']);

  return (
    <ul className={classes.root}>
      {
        categoryArray.map(
          (categoryId) => (
            <li onClick={handleCategoryClick} id={categoryId} key={categoryId}>
              <Label className={classes.label}
                key = {categoryId}
                name={Category[categoryId]}
                color={Category[categoryId] === clickedCategory ? AppColor.GREEN : AppColor.BLACK70}
                fontSize={16}
              /></li>),
        )}
    </ul>
  );
};

export default LikeListCategory;
