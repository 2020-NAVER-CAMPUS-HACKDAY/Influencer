import React, { useState, useEffect } from 'react';
import useStyles from 'components/Swiper/styles';

const CardWrapper: React.FC = (props) => {
  const { children } = props;
  const classes = useStyles(props);

  useEffect(() => {
    // componentDidMount, componentDidUpdate
    // set up cards
    // : 예를 들어 10개 데이터 받으면, z-index와 opacity 등등으로 정렬함
  });

  return (
    <div className="container">
      <div className="cards_container">
        {children}
        {/* Render cards => card container 리턴 (예 : 10개 카드 데이터) */}
        {/* 하위 Card component에선 그것들 가지고 인터랙션 놀이함 */}
      </div>
    </div>
  );
};

export default CardWrapper;
