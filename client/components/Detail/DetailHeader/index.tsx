import React from 'react';
import AppBar from 'components/Common/AppBar';
import Label from 'components/Common/Label';
import { AppColor } from 'constant';
import SVGButton from 'components/Common/SVGButton';
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
