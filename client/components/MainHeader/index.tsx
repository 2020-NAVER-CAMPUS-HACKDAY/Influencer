import React from 'react';
import useStyles from 'components/MainHeader/styles';
import Content from 'components/Content';
import AppBar from 'components/AppBar';
import SVGButton from 'components/SVGButton';
import HamburgerMenu from 'svgs/HamburgerMenu';
import { AppColor } from 'constant';
import Logo from 'components/Logo';

const MainHeader: React.FunctionComponent = (props) => {
  const { children } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.layout}>
      <AppBar backgroundColor={AppColor.MAIN_HEADER}>
        <Logo/>
        <SVGButton>
          <HamburgerMenu/>
        </SVGButton>
        </AppBar>
      <Content>{children}</Content>
    </div>
  );
};

export default MainHeader;
