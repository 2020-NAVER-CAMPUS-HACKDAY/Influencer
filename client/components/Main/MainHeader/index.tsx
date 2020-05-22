import React, { FC } from 'react';
import useStyles from 'components/Main/MainHeader/styles';
import Content from 'components/Main/Content';
import AppBar from 'components/Common/AppBar';
import SVGButton from 'components/Common/SVGButton';
import HamburgerMenu from 'svgs/HamburgerMenu';
import { AppColor } from 'constant';
import Label from 'components/Common/Label';

const MainHeader: FC = (props) => {
  const { children } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.layout}>
      <AppBar backgroundImage={AppColor.MAIN_HEADER}>
        <Label/>
        <SVGButton>
          <HamburgerMenu/>
        </SVGButton>
      </AppBar>
      <Content>{children}</Content>
    </div>
  );
};

export default MainHeader;
