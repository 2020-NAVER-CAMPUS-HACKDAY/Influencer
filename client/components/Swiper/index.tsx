import React, { useState } from 'react';
import useStyles from 'components/Swiper/styles';
import Card from 'components/Swiper/Card';
import CardWrapper from 'components/Swiper/CardWrapper';
import CardDummyData from 'components/Swiper/CardDummyData';

const Swiper: React.FC = () => {
  const classes = useStyles();
  const [userAct, setUserAct] = useState('상태 확인을 위해 임시로 만들어진 부분입니다.');

  function handleSwipeLeft(data: string): void {
    setUserAct(`당신은 ${data} 를 [싫어요] 하셨습니다.`);
  }

  function handleSwipeRight(data: string): void {
    setUserAct(`당신은 ${data} 를 [좋아요] 하셨습니다.`);
  }

  function handleDoubleTap(data: string): void {
    setUserAct(`당신은 ${data} 를 [찜] 하셨습니다.`);
  }

  function renderCards(): object {
    return CardDummyData.map((data) => (
      <Card
        key={data.productId}
        data={data.productName}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        onDoubleTap={handleDoubleTap}>
        {data.productName} Hello World!
      </Card>
    ));
  }

  return (
    <>
      <CardWrapper>
        {renderCards()}
      </CardWrapper>
      <div className={classes.temp}>
        {userAct}
      </div>
    </>
  );
};

export default Swiper;
