import React, { useState } from 'react';
import useStyles from 'components/Interaction/Swiper/styles';
import Hammer from 'react-hammerjs';
import clsx from 'clsx';

interface CardProps {
  productId: number;
  onSwipeRight: (productId: number) => void;
  onDoubleTap: (productId: number) => void;
}

const Card: React.FC<CardProps> = (props) => {
  const { children } = props;
  const [isMoving, setIsMoving] = useState(false);
  const [mouseState, setMouseState] = useState([0, 0, 0]);
  const [swipeAction, setSwipeAction] = useState('');
  const classes = useStyles();

  function handlePan(event): void {
    setIsMoving(true);
    setMouseState([
      event.deltaX,
      event.deltaY,
      (event.deltaX * 0.03) * (event.deltaY / 80),
    ]);
    if (event.deltaX > 0) {
      setSwipeAction('좋아요');
    } else if (event.deltaX < 0) {
      setSwipeAction('싫어요');
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
      setSwipeAction('');
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
      props.onSwipeRight(props.productId);
    }
  }

  function handleDoubleTap(): void {
    const windowHeight = document.body.clientHeight;
    setMouseState([0, -(windowHeight) - 100, 80]);
    props.onDoubleTap(props.productId);
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
        }}
      >
        <div
          className={clsx(
            classes.action,
            swipeAction === '좋아요' && classes.action_good,
            swipeAction === '싫어요' && classes.action_bad,
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
