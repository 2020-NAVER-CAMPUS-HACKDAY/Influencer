import React, { FC, useEffect, useRef } from 'react';
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
  // const viewCenterX = useRef(document.body.clientWidth / 2);
  const scrollWidth = useRef(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    scrollWidth.current = document.getElementById('section_scroll').getBoundingClientRect().width;
  }, []);

  // TODO(jominjimail): duplicated function
  const setCategory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const categoryId: string = event.currentTarget.value;
    Router.push(`/search/category?catId=${categoryId}`, undefined, { shallow: true });
  };

  const moveX = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const firstCardElement = document.getElementById('firstCard');
    const firstX = firstCardElement.getBoundingClientRect().x;

    const { x, width } = event.currentTarget.getBoundingClientRect();
    const targetCenter = width / 2;

    const first2target = Math.abs(firstX) + x + targetCenter;
    const target2end = scrollWidth.current - first2target;

    console.log(first2target, target2end);
    console.log(first2target + target2end);
    // console.log(viewCenterX.current);
    setCategory(event);
  };

  const basicRender = (child: Category): React.ReactElement => {
    const isHighLight = child.categoryId === catId;
    console.log('basic');
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

  const scrollRender = (child: Category, index: number): React.ReactElement => {
    const isHighLight = child.categoryId === catId;
    const isFirst = index === 0;
    console.log('scroll');
    return (
      <button
        id={isFirst ? 'firstCard' : ''}
        key={child.categoryId}
        className={clsx(classes.button, classes.cardContent, isHighLight && classes.highLight)}
        onClick={moveX}
        value={child.categoryId}
      >
        {child.value.categoryName}
      </button>);
  };

  return (
    <section className={classes.container}>
      <div id='section_scroll' className={clsx(classes.card, classes.scroll)}>
        {isLastLevel
          ? childrenData.map((child, index) => scrollRender(child, index))
          : childrenData.map((child) => basicRender(child))
        }
      </div>
    </section>
  );
};

export default ChildrenCard;
