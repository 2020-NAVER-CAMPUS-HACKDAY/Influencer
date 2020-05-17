import React, { FC } from 'react';
import { Divider } from '@material-ui/core';

import useStyles from 'components/Detail/DetailProductContent/styles';
import AppBar from 'components/Common/AppBar';
import Label from 'components/Common/Label';
import { AppColor } from 'constant';
import clsx from 'clsx';
import DetailInfo from 'components/Detail/DetailProductContent/DetailInfo';
import OutlinedButton from 'components/Common/OutlinedButton';
import Like from 'svgs/Like';
import Share from 'svgs/Share';

export interface DetailProductContentProps {
  id: string;
  name: string;
  price: string;
  modelName: string;
  makeCompany: string;
  brand: string;
}
const DetailProductContent: FC<DetailProductContentProps> = (props) => {
  const classes = useStyles();
  const {
    name, price, modelName, makeCompany, brand,
  } = props;
  return (
    <>
      <AppBar
        className={clsx(classes.align, classes.paddingTop)}
        backgroundColor={AppColor.WHITE}
        isNotFixed
      >
        <Label className={classes.paddingTop} name={name} color={AppColor.BLACK} />
      </AppBar>
      <AppBar
        className={clsx(classes.align, classes.priceBar)}
        backgroundColor={AppColor.WHITE}
        isNotFixed
      >
        <Label name={price} color={AppColor.BLACK} />
        <Label className={classes.paddingTop}
          name={'원'}
          fontSize={18}
          color={AppColor.BLACK}
        />
      </AppBar>
      <div className={classes.marginTop}/>
      <AppBar
        className={clsx(classes.align, classes.productInfoBar)}
        backgroundColor={AppColor.WHITE}
        isNotFixed
      >
        <Label name={'상품 정보'} color={AppColor.BLACK} />
      </AppBar>
      <Divider />
      <AppBar
        className={clsx(classes.align, classes.productDetailBar)}
        backgroundColor={AppColor.WHITE}
        height={'195px'}
        isNotFixed
      >
        <DetailInfo value={makeCompany} column={'제조사'}/>
        <DetailInfo value={brand} column={'브랜드'}/>
        <DetailInfo value={modelName} column={'모델명'}/>
      </AppBar>
      <AppBar
        className={classes.productInfoBar}
        backgroundColor={AppColor.DARK_GREY}
        height={'50px'}
        isNotFixed
      >
        {/* TODO(daeun): add share view */}
        <OutlinedButton handleClick={() => 0} className={classes.marginRight}>
          <Share/>
          <Label className={classes.marginLeft} name={'공유'} color={AppColor.BLACK} fontSize={20}/>
        </OutlinedButton>
        {/* TODO(daeun): add like Api */}
        <OutlinedButton handleClick={() => 0}>
          <Like/>
          <Label className={classes.marginLeft} name={'찜'} color={AppColor.BLACK} fontSize={20}/>
        </OutlinedButton>
      </AppBar>
    </>
  );
};

export default DetailProductContent;