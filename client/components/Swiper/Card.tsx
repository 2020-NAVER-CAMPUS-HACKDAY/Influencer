import React, { useState, useEffect } from 'react';
import useStyles from 'components/Swiper/styles';
import Hammer from 'react-hammerjs';

export interface CardProps {
  // xMulti?: number;
  // yMulti?: number;
  // rotate?: number;
}

const SwiperCard: React.FC<CardProps> = (props) => {
  const { children } = props;
  const classes = useStyles(props);

  useEffect(() => {
    // componentDidMount
  }, []);

  function handlePan(event) {
    let xMulti = 0;
    let yMulti = 0;
    let rotate = 0;
    if (event.deltaX <= 0 || event.deltaX >= 0) {
      if (event.deltaX === 0) return;
      if (event.center.x === 0 && event.center.y === 0) return;
      xMulti = event.deltaX * 0.03;
      yMulti = event.deltaY / 80;
      rotate = xMulti * yMulti;
      event.target.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
    }
  }

  function handlePanEnd(event) {
    // 잡기 끝
    let moveOutWidth = 0;
    let keep = false;
    let endX = 0;
    let toX = 0;
    let endY = 0;
    let toY = 0;
    let xMulti = 0;
    let yMulti = 0;
    let rotate = 0;
    console.log('onPanEnd');
    if (event.deltaX <= 0 || event.deltaX >= 0){
      moveOutWidth = document.body.clientWidth;
      keep = Math.abs(event.deltaX) < 300;
      if (keep) {
        event.target.style.transform = '';
      } else {
        endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
        toX = event.deltaX > 0 ? endX : -endX;
        endY = Math.abs(event.velocityY) * moveOutWidth;
        toY = event.deltaY > 0 ? endY : -endY;
        xMulti = event.deltaX * 0.03;
        yMulti = event.deltaY / 80;
        rotate = xMulti * yMulti;
        event.target.style.transform = `translate(${toX}px, ${toY + event.deltaY}px) rotate(${rotate}deg)`;
        // DO SWIPE ACTIONS
        // this.props.superOnSwipe();
        // if(this.props.onSwipe) this.props.onSwipe(this.props.data);
        // if(toX < 0 && this.props.onSwipeLeft) {
        //   this.props.onSwipeLeft(this.props.data);
        // } else if(this.props.onSwipeRight) {
        //   this.props.onSwipeRight(this.props.data);
        // }
      }
    }
  }

  function handleDoubleTap() {
    // 찜하기 + 위로 보내기
    alert('You Liked this Product!');
  }

  return (
    <div>
      <Hammer
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        onDoubleTap={handleDoubleTap}
      >
        <div className={classes.card}>hello</div>
      </Hammer>
    </div>
  );
};

export default SwiperCard;
