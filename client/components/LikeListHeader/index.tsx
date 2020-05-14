import React, { FC } from 'react';
import AppBar from 'components/AppBar';
import { AppColor } from 'constant';
import Logo from 'components/Logo';

const LikeListHeader = () => (
  <AppBar backgroundImage={AppColor.MAIN_HEADER} isNotFixed>
    <Logo pageName='쇼핑MY'/>
  </AppBar>
);

export default LikeListHeader;
