import React from 'react';
import AppBar from 'components/AppBar';
import Logo from 'components/Logo';
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
        <Logo pageName={props.productName}/>
        <SVGButton>
            <HamburgerMenu/>
            </SVGButton>
        </AppBar>
);

export default DetailHeader;
