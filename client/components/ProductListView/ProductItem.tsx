import React, { FC } from 'react';
import useStyles from 'components/ProductListView/styles';

interface ProductItemProps {
  id: number;
  price: number;
  name: string;
  category: number;
  company: string;
  imageUri: string;
}

const ProductItem: FC<ProductItemProps> = (props) => {
  const classes = useStyles();

  return (
    <article className={classes.card}>
      <div className={classes.cardPhoto}>
        <img className={classes.image} src={props.imageUri} />
      </div>
      <div className={classes.cardDesc}>
        <h2 className={classes.name}>{props.name}</h2>
        <div className={classes.company}>{props.company}</div>
        <div className={classes.price}>{`${props.price}원`}</div>
      </div>
    </article>
  );
};

export default ProductItem;
