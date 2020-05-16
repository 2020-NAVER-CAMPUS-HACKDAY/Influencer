import React, { useState } from 'react';
import useStyles from 'components/Swiper/styles';
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
  const [isSwiped, setIsSwiped] = useState(false);
  const [mouseState, setMouseState] = useState([0, 0, 0]);
  const classes = useStyles();

  function handlePan(event): void {
    setIsMoving(true);
    setMouseState([
      event.deltaX,
      event.deltaY,
      (event.deltaX * 0.03) * (event.deltaY / 80),
    ]);
  }

  function handlePanEnd(event): void {
    let keep = false;
    let moveOutWidth = 0;
    let [endX, toX, endY, toY] = [0, 0, 0, 0];
    setIsMoving(false);
    keep = Math.abs(event.deltaX) < 300;
    if (keep) {
      event.target.style.transform = '';
    } else {
      moveOutWidth = document.body.clientWidth;
      endX = event.velocityX > 1 ? Math.abs(event.velocityX) * moveOutWidth : moveOutWidth;
      toX = event.deltaX > 0 ? endX : -endX;
      endY = Math.abs(event.velocityY) * moveOutWidth;
      toY = event.deltaY > 0 ? endY : -endY;
      setMouseState([
        toX,
        toY + event.deltaY,
        (event.deltaX * 0.03) * (event.deltaY / 80),
      ]);
      if (toX < 0) {
        setIsSwiped(true);
      } else {
        setIsSwiped(true);
        props.onSwipeRight(props.productId);
      }
    }
  }

  function handleDoubleTap(): void {
    setMouseState([0, -(document.body.clientHeight) - 100, 80]);
    setIsSwiped(true);
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
          'card',
          classes.card,
          isMoving && classes.card_moving,
          isSwiped && 'removed',
        )}
        style={{
          transform: `translate(${mouseState[0]}px, ${mouseState[1]}px) rotate(${mouseState[2]}deg)`,
        }}
      >
        {children}
      </div>
    </Hammer>
  );
};

export default Card;
