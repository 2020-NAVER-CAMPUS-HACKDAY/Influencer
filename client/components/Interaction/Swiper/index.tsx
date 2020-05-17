import React from 'react';
import useStyles from 'components/Interaction/Swiper/styles';
import Card from 'components/Interaction/Swiper/Card';
import SwiperItem from 'components/Interaction/SwiperItem';
import { ProductProps } from 'components/Interaction/SwiperItem/interface';

interface SwiperProps {
  products: ProductProps[];
}

const Swiper: React.FC<SwiperProps> = (props) => {
  const { products } = props;
  const classes = useStyles();

  function handleInteraction(productId: number): number {
    // TODO(seogeurim) : handle Interaction Log Data
    return productId;
  }

  function handleLike(productId: number): number {
    // TODO(seogeurim) : handle Like Data
    return productId;
  }

  function renderCards(): object {
    return products.map((data) => (
      <Card
        key={data.productId}
        productId={data.productId}
        onSwipeRight={handleInteraction}
        onDoubleTap={handleLike}>
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
