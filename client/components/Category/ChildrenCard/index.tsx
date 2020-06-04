import React, {
  FC, useEffect, useState,
} from 'react';
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
  const [transValue, setTransValue] = useState<number>(0);

  // TODO(jominjimail): duplicated function
  const setCategory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const categoryId: string = event.currentTarget.value;
    Router.push(`/search/category?catId=${categoryId}`, undefined, { shallow: true });
  };

  const calculateX = (client2target, Begin2target, target2End, clientHalfWidth):
  {canMove: boolean; translate: number} => {
    let canMove = false;
    let translate = 0;

    if (client2target < 0) {
      // <---
      if (target2End - Math.abs(client2target) > 0) {
        canMove = true;
        translate = client2target;
        if (target2End < clientHalfWidth) {
          translate = client2target + (clientHalfWidth - target2End);
        }
      }
    } else if (client2target >= 0) {
      // --->
      if (Begin2target - client2target > 0) {
        canMove = true;
        translate = client2target;
        if (Begin2target < clientHalfWidth) {
          translate = client2target - (clientHalfWidth - Begin2target);
        }
      }
    }
    return { canMove, translate };
  };

  const moveX = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    if (isLastLevel) {
      const scrollWidth = document.getElementById('section_scroll').getBoundingClientRect().width;
      const clientWidthCenter = document.body.clientWidth / 2;
      const firstCardElement = document.getElementById('firstCard');
      const firstCardX = firstCardElement.getBoundingClientRect().x;

      const { x, width } = event.currentTarget.getBoundingClientRect();
      const targetCenter = x + width / 2;

      const scrollBegin2targetCenter = Math.abs(firstCardX) + targetCenter;
      const targetCenter2scrollEnd = scrollWidth - scrollBegin2targetCenter;

      const clientCenter2targetCenter = clientWidthCenter - targetCenter;

      const { canMove, translate } = calculateX(
        clientCenter2targetCenter,
        scrollBegin2targetCenter,
        targetCenter2scrollEnd,
        clientWidthCenter,
      );
      if (canMove && translate !== 0) {
        setTransValue(transValue + translate);
      }
    }
    setCategory(event);
  };

  useEffect(() => {
    const scrollElement = document.getElementById('section_scroll');
    scrollElement.style.transitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
    scrollElement.style.transitionDuration = '450ms';
    scrollElement.style.transform = `translate(${transValue}px, 0px)`;
  }, [transValue]);

  const cardRender = (child: Category, index: number): React.ReactElement => {
    const isHighLight = child.categoryId === catId;
    const isFirst = index === 0;
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
        {childrenData.map((child, index) => cardRender(child, index))}
      </div>
    </section>
  );
};

export default ChildrenCard;
