import React, { FC, useState } from 'react';
import { CardProps } from 'components/Interaction/Swiper/interface';
import useStyles from 'components/Interaction/Swiper/styles';
import { SwipeAction } from 'constant';
import Hammer from 'react-hammerjs';
import clsx from 'clsx';

const Card: FC<CardProps> = (props) => {
  const classes = useStyles();
  const {
    children, productId, onSwipeRight, onDoubleTap, onSwiped, cardIndex, totalCard,
  } = props;
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [mouseState, setMouseState] = useState<[number, number, number]>([0, 0, 0]);
  const [swipeAction, setSwipeAction] = useState<string>(SwipeAction.DEFAULT);

  function handlePan(event): void {
    setIsMoving(true);
    setMouseState([
      event.deltaX,
      event.deltaY,
      (event.deltaX * 0.03) * (event.deltaY / 80),
    ]);
    if (event.deltaX > 0) {
      setSwipeAction(SwipeAction.LIKE);
    } else if (event.deltaX < 0) {
      setSwipeAction(SwipeAction.UNLIKE);
    } else {
      setSwipeAction(SwipeAction.DEFAULT);
    }
  }

  function handlePanEnd(event): void {
    let keep = false;
    let [endX, toX, endY, toY] = [0, 0, 0, 0];
    const windowWidth = document.body.clientWidth;
    setIsMoving(false);
    keep = Math.abs(event.deltaX) < 200;
    if (keep) {
      event.target.style.transform = '';
      setSwipeAction(SwipeAction.DEFAULT);
    } else {
      endX = event.velocityX > 1 ? Math.abs(event.velocityX) * windowWidth : windowWidth;
      toX = event.deltaX > 0 ? endX : -endX;
      endY = Math.abs(event.velocityY) * windowWidth;
      toY = event.deltaY > 0 ? endY : -endY;
      setMouseState([
        toX,
        toY + event.deltaY,
        (event.deltaX * 0.03) * (event.deltaY / 80),
      ]);
    }
    if (toX >= windowWidth) {
      onSwipeRight(productId);
    }
    if (Math.abs(toX) >= windowWidth) {
      onSwiped(cardIndex);
    }
  }

  function handleDoubleTap(): void {
    const windowHeight = document.body.clientHeight;
    setMouseState([0, -(windowHeight) - 100, 80]);
    onDoubleTap(productId);
    onSwiped(cardIndex);
  }

  return (
    <Hammer
      onPan={handlePan}
      onPanEnd={handlePanEnd}
      onDoubleTap={handleDoubleTap}
    >
      <div
        className={clsx(
          classes.card,
          isMoving && classes.card_moving,
        )}
        style={{
          transform: `translate(${mouseState[0]}px, ${mouseState[1]}px) rotate(${mouseState[2]}deg)`,
          zIndex: totalCard - cardIndex,
        }}
      >
        <div
          className={clsx(
            classes.action,
            swipeAction === SwipeAction.LIKE && classes.action_good,
            swipeAction === SwipeAction.UNLIKE && classes.action_bad,
          )}>
          <span>
            {swipeAction}
          </span>
        </div>
        {children}
      </div>
    </Hammer>
  );
};

export default Card;
