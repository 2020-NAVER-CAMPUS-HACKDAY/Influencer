import React from 'react';
import useStyles from 'components/Swiper/styles';
import Card from 'components/Swiper/Card';
import SwiperItem from 'components/SwiperItem';
import { ProductProps } from 'components/SwiperItem/interface';

interface SwiperProps {
  products: ProductProps[];
}

const Swiper: React.FC<SwiperProps> = (props) => {
  const { products } = props;
  const classes = useStyles();

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
    <div className={classes.containerWrapper}>
      <div className={classes.container}>
        {renderCards()}
      </div>
    </div>
  );
};

export default Swiper;
