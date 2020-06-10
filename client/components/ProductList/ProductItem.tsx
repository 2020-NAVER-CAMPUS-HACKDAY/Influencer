import React, { FC, useRef } from 'react';
import Router from 'next/router';
import clsx from 'clsx';
import Heart from 'components/Common/Heart';
import useStyles from 'components/ProductList/styles';
import { Product } from 'interfaces/product';
import { addCommaStringFromThreeCntNum } from 'utils/stringUtils';

const ProductItem: FC<Product> = (props) => {
  const classes = useStyles();
  const img = useRef(null);

  const cutName = (name: string): string => {
    const { length } = name;
    return length > 24 ? `${name.split('').splice(0, 17).join('')} ...` : name;
  };

  const routeDetailPage = (): void => {
    Router.push('/detail/[productid]', `/detail/${props.productNo}`);
  };

  return (
    <article className={classes.card}>
      <div className={classes.cardPhoto} onClick={routeDetailPage}>
        <img
          ref={img}
          className={clsx(classes.image, props.isLazy && 'lazy')}
          data-src={props.productImages && props.productImages[0].url}
        />
      </div>
      <div className={classes.cardDesc}>
        <div className={classes.title}>
          <div className={classes.name} onClick={routeDetailPage}>
            {cutName(props.name)}
          </div>
          <Heart />
        </div>
        <div className={classes.priceWrapper}>
          <div className={classes.price}>
            {addCommaStringFromThreeCntNum(props.salePrice)}
          </div>
          <div className={classes.unit}>원</div>
        </div>
      </div>
    </article>
  );
};

export default ProductItem;
