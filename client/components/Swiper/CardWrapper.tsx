import React, { useState, useEffect } from 'react';
import useStyles from 'components/Swiper/styles';

const CardWrapper: React.FC = (props) => {
  const { children } = props;
  const classes = useStyles(props);

  function setCards() {
    // : 예를 들어 10개 데이터 받으면, z-index와 opacity 등등으로 정렬함
  }

  useEffect(() => {
    // componentDidMount, componentDidUpdate
    setCards();
  });

  return (
    <div className={classes.container}>
      {children}
    </div>
  );
};

export default CardWrapper;
