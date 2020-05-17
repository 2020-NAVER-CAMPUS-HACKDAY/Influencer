import React from 'react';
import useStyles from 'components/SwiperItem/styles';
import { ProductProps } from 'components/SwiperItem/interface';
import { addCommaStringFromThreeCntNum } from 'utils/stringUtils';

interface SwiperItemProps {
  productData: ProductProps;
}

const SwiperItem: React.FC<SwiperItemProps> = (props) => {
  const { productName, productImages, salePrice } = props.productData;
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

export default SwiperItem;