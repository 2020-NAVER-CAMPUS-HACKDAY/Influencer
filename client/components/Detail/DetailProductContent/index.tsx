import React, { FC } from 'react';
import { Divider } from '@material-ui/core';

import useStyles from 'components/Detail/DetailProductContent/styles';
import AppBar from 'components/Common/AppBar';
import Label from 'components/Common/Label';
import { AppColor } from 'constant';
import clsx from 'clsx';
import DetailInfo from 'components/Detail/DetailProductContent/DetailInfo';

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
            height={'200px'}
            isNotFixed
          >
            <DetailInfo value={makeCompany} column={'제조사'}/>
            <DetailInfo value={brand} column={'브랜드'}/>
            <DetailInfo value={modelName} column={'모델명'}/>
          </AppBar>
        </>
  );
};

export default DetailProductContent;
