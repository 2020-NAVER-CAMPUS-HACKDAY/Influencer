import React, { FC } from 'react';
import { SwiperProps } from 'components/Interaction/Swiper/interface';
import useStyles from 'components/Interaction/Swiper/styles';
import Card from 'components/Interaction/Swiper/Card';
import SwiperItem from 'components/Interaction/SwiperItem';

const Swiper: FC<SwiperProps> = (props) => {
  const classes = useStyles();
  const { products, setPage, page, isLoading } = props;

  function handleInteraction(productId: string): string {
    // TODO(seogeurim) : handle Interaction Log Data
    return productId;
  }

  function handleLike(productId: string): string {
    // TODO(seogeurim) : handle Like Data
    return productId;
  }

  function handlePage(cardIndex: number): void {
    if (cardIndex % 10 === 7) {
      setPage();
    }
  }

  function renderCards(): object {
    return products.map((product, index) => (
      <Card
        key={product.productId}
        productId={product.productId}
        onSwipeRight={handleInteraction}
        onDoubleTap={handleLike}
        onSwiped={handlePage}
        cardIndex={index}
        totalCard={page * 10}
      >
        <SwiperItem
          productData={product}
        />
      </Card>
    ));
  }

  return (
    <div className={classes.containerWrapper}>
      <div className={classes.container}>
        {products && renderCards()}
        <div className={classes.card_end}>
          <span>더이상 표시할 카드가 없습니다.</span>
        </div>
        {isLoading && (
          <div className={classes.card_end}>
            <span>로딩 중</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Swiper;
