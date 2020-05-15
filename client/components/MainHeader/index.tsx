import React from 'react';
import useStyles from 'components/MainHeader/styles';
import Content from 'components/Content';
import AppBar from 'components/AppBar';
import SVGButton from 'components/SVGButton';
import HamburgerMenu from 'svgs/HamburgerMenu';
import { AppColor } from 'constant';
import Label from 'components/Label';

const MainHeader: React.FunctionComponent = (props) => {
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
