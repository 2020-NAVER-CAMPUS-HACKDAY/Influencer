import React, { FC } from 'react';
import AppBar from 'components/Common/AppBar';
import Label from 'components/Common/Label';
import { AppColor } from 'constant';
import SVGButton from 'components/Common/SVGButton';
import Direction from 'svgs/Direction';
import HamburgerMenu from 'svgs/HamburgerMenu';
import Router from 'next/router';

interface DetailHeaderProps {
  productName: string;
}

const DetailHeader: FC<DetailHeaderProps> = (props) => (
  <AppBar backgroundColor={AppColor.DETAIL_HEADER}>
    <SVGButton handleClick={(): void => Router.back()}>
      <Direction/>
    </SVGButton>
    <Label name={props.productName}/>
    <SVGButton>
      <HamburgerMenu/>
    </SVGButton>
  </AppBar>
);

export default DetailHeader;
