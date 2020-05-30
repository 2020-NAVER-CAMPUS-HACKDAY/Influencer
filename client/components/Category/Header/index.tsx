import React, { FC } from 'react';
import { Category } from 'interfaces/category';
import Router from 'next/router';
import useStyles from 'components/Category/Header/styles';
import { PublicImageCategoryPath, ImageArray, ImageExtension } from 'constant';

interface CategoryHeaderProps {
  categoryData: Category[];
}

const CategoryHeader: FC<CategoryHeaderProps> = (props) => {
  const { categoryData } = props;
  const classes = useStyles();

  const setCategory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const categoryId: string = event.currentTarget.value;
    Router.push(`/search/category?catId=${categoryId}`, undefined, { shallow: true });
  };

  const categoryElements = categoryData.map((category, index) => {
    const { categoryId } = category;
    return (
      <div className={classes.content} key={categoryId}>
        <button
          className={classes.button}
          onClick={setCategory}
          value={categoryId}
        >
          <img src={`${PublicImageCategoryPath}${ImageArray[index]}${ImageExtension.PNG}`}
            className={classes.image}
          ></img>
          <div>{category.value.categoryName}</div>
        </button>
      </div>
    );
  });

  return (
    <div className={classes.container}>
      {categoryElements}
    </div>
  );
};

export default CategoryHeader;
