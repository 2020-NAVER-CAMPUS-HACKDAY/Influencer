import React from 'react';
import CardWrapper from 'components/Swiper/CardWrapper';
import Card from 'components/Swiper/Card';
import SwiperItem from 'components/SwiperItem';
import { ProductProps } from 'components/SwiperItem/interface';

interface SwiperProps {
  products: ProductProps[];
}

const Swiper: React.FC<SwiperProps> = (props) => {
  const { products } = props;

  function handleSwipeRight(productId: number): void {
    // TODO(seogeurim) : handle Interaction Log Data
  }

  function handleDoubleTap(productId: number): void {
    // TODO(seogeurim) : handle Like Data
  }

  function renderCards(): object {
    return products.map((data) => (
      <Card
        key={data.productId}
        productId={data.productId}
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
