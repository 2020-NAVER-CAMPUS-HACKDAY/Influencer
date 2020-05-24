import React, { FC } from 'react';
import useStyles from 'components/LikeList/LikeListItem/styles';
import { Box } from '@material-ui/core';
import Label from 'components/Common/Label';
import { AppColor } from 'constant';
import clsx from 'clsx';
import { addCommaStringFromThreeCntNum } from 'utils/stringUtils';
import { ProductDetailProps } from 'redux/ducks/Interface';

const LikeListItem: FC<ProductDetailProps> = (props) => {
  const classes = useStyles();
  const {
    category,
    productInfoProvidedNoticeView,
    productImages,
    name,
    salePrice,

  } = props.product;

  const price = addCommaStringFromThreeCntNum(salePrice);

  return (
    <Box className={classes.root}>
      <img className={clsx(classes.spacing, classes.imageWrapper)}
        src={productImages[0].url}
        width={95}
        height={95}
      />
      <Box className={clsx(classes.spacing, classes.columnDirection)}>
        <Label className={clsx(classes.productText, classes.text)}
          fontSize={18}
          color={AppColor.BLACK}
          name={name}
        />
        <Label className={clsx(classes.productPrice, classes.text)}
          fontSize={18}
          color={AppColor.BLACK}
          name={price ? `${price}원` : '미정'}
        />
        <Label className={classes.text}
          fontSize={13}
          color={AppColor.BLACK70}
          name={productInfoProvidedNoticeView?.제조국 ?? '비공개'}
        />
        <Label className={classes.text}
          fontSize={16}
          color={AppColor.BLACK70}
          name={category.category1Name}
        />
      </Box>
    </Box>
  );
};

export default LikeListItem;
