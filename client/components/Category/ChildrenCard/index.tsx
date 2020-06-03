import React, { FC } from 'react';
import useStyles from 'components/Category/ChildrenCard/styles';
import { Category } from 'interfaces/category';
import Router from 'next/router';
import clsx from 'clsx';

interface ChildrenCardProps {
  childrenData: Category[];
  isLastLevel: boolean;
  catId: string | string[];
}
const ChildrenCard: FC<ChildrenCardProps> = (props) => {
  const { childrenData, isLastLevel, catId } = props;
  const classes = useStyles();

  // TODO(jominjimail): duplicated function
  const setCategory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const categoryId: string = event.currentTarget.value;
    Router.push(`/search/category?catId=${categoryId}`, undefined, { shallow: true });
  };

  const basicRender = (child: Category): React.ReactElement => {
    const isHighLight = child.categoryId === catId;
    return (
      <button
        key={child.categoryId}
        className={clsx(classes.button, classes.cardContent, isHighLight && classes.highLight)}
        onClick={setCategory}
        value={child.categoryId}
      >
        {child.value.categoryName}
      </button>);
  };

  return (
    <section className={classes.card}>
      {childrenData.map((child) => basicRender(child))}
    </section>
  );
};

export default ChildrenCard;
