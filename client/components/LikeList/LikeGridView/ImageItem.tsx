import React, { FC } from 'react';
import { ImageItemProps } from 'components/LikeList/LikeGridView/interface';
import useStyles from 'components/LikeList/LikeGridView/styles';

const ImageItem: FC<ImageItemProps> = (props) => {
  const { productId, imageLink } = props.item;
  const classes = useStyles();

  return (
    <img className={classes.data}
      key={productId}
      src={imageLink}
      width={props.imageSize.width}
      height={props.imageSize.height}
    />
  );
};

export default ImageItem;
