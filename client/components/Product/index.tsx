import React, { useState } from 'react';
import useStyles from 'components/Product/styles';
import { ProductProps } from 'components/Product/interface';
import { addCommaStringFromThreeCntNum } from 'utils/stringUtils';

interface ProductDataProps {
  product: ProductProps;
}

const Product: React.FC<ProductDataProps> = (props) => {
  const { productName, productImages, salePrice } = props.product;
  const commaSalePrice = addCommaStringFromThreeCntNum(salePrice);
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.product_image}>
        <img src={productImages.url} alt='product-image' />
      </div>
      <div className={classes.footer}>
        <div className={classes.product_price}>
          <span>{commaSalePrice}</span>
        </div>
        <div className={classes.product_name}>
          <span>{productName}</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
