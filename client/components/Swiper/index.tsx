import React, { useState } from 'react';
import CardWrapper from 'components/Swiper/CardWrapper';
import Card from 'components/Swiper/Card';
import SwiperItem from 'components/SwiperItem';
import { ProductProps } from 'components/SwiperItem/interface';

interface SwiperProps {
  products: ProductProps[];
}

const Swiper: React.FC<SwiperProps> = (props) => {
  const { products } = props;
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
    return products.map((data) => (
      <Card
        key={data.productId}
        productId={data.productId}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        onDoubleTap={handleDoubleTap}>
        <SwiperItem
          productData={data}
        />
      </Card>
    ));
  }

  return (
    <CardWrapper>
      {renderCards()}
    </CardWrapper>
  );
};

export default Swiper;
