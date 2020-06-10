import React, { FC } from 'react';
import useStyles from 'components/Main/MyHeader/styles';
import Content from 'components/Main/Content';
import AppBar from 'components/Common/AppBar';
import SVGButton from 'components/Common/SVGButton';
import HamburgerMenu from 'svgs/HamburgerMenu';
import { AppColor } from 'constant';
import Label from 'components/Common/Label';
import Router from 'next/router';

const MyHeader: FC = (props) => {
  const { children } = props;
  const classes = useStyles(props);

  const goBack = (): void => {
    Router.back();
  };

  return (
    <div className={classes.layout}>
      <AppBar backgroundImage={AppColor.MAIN_HEADER}>
        <Label name='MY'/>
        <SVGButton handleClick={goBack}>
          <HamburgerMenu/>
        </SVGButton>
      </AppBar>
      <Content>{children}</Content>
    </div>
  );
};

export default MyHeader;
