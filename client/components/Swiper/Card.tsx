import React, { useState, useEffect } from 'react';
import useStyles from 'components/Swiper/styles';
import Hammer from 'react-hammerjs';

const SwiperCard: React.FC = (props) => {
  const { children } = props;
  const classes = useStyles(props);

  useEffect(() => {
    // componentDidMount
  }, []);

  function handlePan() {
    // 붙잡고 있음
    console.log('onPan');
  }

  function handlePanEnd() {
    // 잡기 끝
    console.log('onPanEnd');
  }

  function handleDoubleTap() {
    // 찜하기
    console.log('DoubleTap');
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
