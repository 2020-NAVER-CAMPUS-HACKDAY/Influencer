import React, { FC } from 'react';
import useStyles from 'components/Category/ChildrenCard/styles';
import { Category } from 'interfaces/category';
import Router from 'next/router';
import clsx from 'clsx';

interface ChildrenCardProps {
  childrenData: Category[];
}
const ChildrenCard: FC<ChildrenCardProps> = (props) => {
  const { childrenData } = props;
  const classes = useStyles();

  // TODO(jominjimail): duplicated function
  const setCategory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const categoryId: string = event.currentTarget.value;
    Router.push(`/search/category?catId=${categoryId}`, undefined, { shallow: true });
  };

  return (
    <section className={classes.card}>
      {childrenData.map((child) => (
        <button
          key={child.categoryId}
          className={clsx(classes.button, classes.cardContent)}
          onClick={setCategory}
          value={child.categoryId}
        >
          {child.value.categoryName}
        </button>
      ))}
    </section>
  );
};

export default ChildrenCard;
