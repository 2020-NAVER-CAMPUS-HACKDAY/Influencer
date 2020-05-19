import React, { FC, useState } from 'react';
import { SwiperProps } from 'components/Interaction/Swiper/interface';
import useStyles from 'components/Interaction/Swiper/styles';
import Card from 'components/Interaction/Swiper/Card';
import SwiperItem from 'components/Interaction/SwiperItem';

const Swiper: FC<SwiperProps> = (props) => {
  const { products } = props;
  const classes = useStyles();

  function handleInteraction(productId: string): string {
    // TODO(seogeurim) : handle Interaction Log Data
    return productId;
  }

  function handleLike(productId: string): string {
    // TODO(seogeurim) : handle Like Data
    return productId;
  }

  function renderCards(): object {
    return products.map((data, index) => (
      <Card
        key={data.productId}
        productId={data.productId}
        onSwipeRight={handleInteraction}
        onDoubleTap={handleLike}
        cardIndex={index}
        totalCard={10}
      >
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
        <div className={classes.card_end}>
          <span>더이상 표시할 카드가 없습니다.</span>
        </div>
      </div>
    </div>
  );
};

export default Swiper;
