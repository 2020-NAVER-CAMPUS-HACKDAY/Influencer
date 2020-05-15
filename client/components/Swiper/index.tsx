import React, { useState } from 'react';
import useStyles from 'components/Swiper/styles';
import CardWrapper from 'components/Swiper/CardWrapper';
import Card from 'components/Swiper/Card';
import Product from 'components/Product';
import { ProductProps } from 'components/Product/interface';

interface SwiperProps {
  productData: ProductProps[];
}

const Swiper: React.FC<SwiperProps> = (props) => {
  const classes = useStyles();
  const [userAct, setUserAct] = useState('상태 확인을 위해 임시로 만들어진 부분입니다.');

  function handleSwipeLeft(productId: number): void {
    setUserAct(`당신은 ${productId} 를 [싫어요] 하셨습니다.`);
  }

  function handleSwipeRight(productId: number): void {
    setUserAct(`당신은 ${productId} 를 [좋아요] 하셨습니다.`);
  }

  function handleDoubleTap(productId: number): void {
    setUserAct(`당신은 ${productId} 를 [찜] 하셨습니다.`);
  }

  function renderCards(): object {
    return props.productData.map((data) => (
      <Card
        key={data.productId}
        productId={data.productId}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        onDoubleTap={handleDoubleTap}>
        <Product
          product={data}
        />
      </Card>
    ));
  }

  return (
    <>
      <CardWrapper>
        {renderCards()}
      </CardWrapper>
    </>
  );
};

export default Swiper;
