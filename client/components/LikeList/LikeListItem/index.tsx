import React from 'react';
import useStyles from 'components/LikeList/LikeListItem/styles';
import { Box } from '@material-ui/core';
import Label from 'components/Common/Label';
import { AppColor } from 'constant';
import clsx from 'clsx';
import { addCommaStringFromThreeCntNum } from 'utils/stringUtils';
import SVGButton from 'components/Common/SVGButton';
import Delete from 'svgs/Delete';

interface LikeListItemProps {
  item: LikeListProps;
}

// TODO(daeun): modify listProps when connecting with api
export interface LikeListProps {
  productId: number;
  productCompany: string;
  productPrice: number;
  productName: string;
  category: number;
  imageLink: string;
  likeDate: string;
}

const LikeListItem: React.FC<LikeListItemProps> = (props) => {
  const classes = useStyles();
  const {
    imageLink,
    productName,
    productCompany,
    productPrice,
    category,
  } = props.item;

  const price = addCommaStringFromThreeCntNum(productPrice);

  return (
    <Box className={classes.root}>
      <img className={clsx(classes.spacing, classes.imageWrapper)}
        src={imageLink}
        width={95}
        height={95}
      />
      <Box className={clsx(classes.spacing, classes.columnDirection)}>
        <Label className={clsx(classes.productText, classes.text)}
          fontSize={18}
          color={AppColor.BLACK}
          name={productName}
        />
        <Label className={clsx(classes.productPrice, classes.text)}
          fontSize={18}
          color={AppColor.BLACK}
          name={price ? `${price}원` : '미정'}
        />
        <Label className={classes.text}
          fontSize={13}
          color={AppColor.BLACK70}
          name={productCompany}
        />
        <Label className={classes.text}
          fontSize={16}
          color={AppColor.BLACK70}
          name={category.toString()}
        />
      </Box>
      <SVGButton className={classes.columnDirection}>
        <Delete />
      </SVGButton>
    </Box>
  );
};

export default LikeListItem;
