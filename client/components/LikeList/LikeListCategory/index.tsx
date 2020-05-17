import React, { FC } from 'react';
import { LikeListCategoryProps } from 'components/LikeList/LikeGridView/interface';
import Label from 'components/Common/Label';
import { AppColor, Category } from 'constant';
import useStyles from 'components/LikeList/LikeListCategory/styles';

const LikeListCategory: FC<LikeListCategoryProps> = (props) => {
  const { handleItemClick, clickedCategory, categoryArray } = props;
  const classes = useStyles();

  return (
    <ul className={classes.root}>
      {
        categoryArray.map(
          (categoryId) => (
            <li onClick={handleItemClick} id={Category[categoryId]} key={categoryId}>
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
