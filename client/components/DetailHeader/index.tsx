import React from 'react';
import AppBar from 'components/AppBar';
import Label from 'components/Label';
import { AppColor } from 'constant';
import SVGButton from 'components/SVGButton';
import Direction from 'svgs/Direction';
import HamburgerMenu from 'svgs/HamburgerMenu';

interface DetailHeaderProps {
  productName: string;
}

const DetailHeader: React.FC<DetailHeaderProps> = (props) => (
    <AppBar backgroundColor={AppColor.DETAIL_HEADER}>
        <SVGButton>
            <Direction/>
            </SVGButton>
        <Label name={props.productName}/>
        <SVGButton>
            <HamburgerMenu/>
            </SVGButton>
        </AppBar>
);

export default DetailHeader;
