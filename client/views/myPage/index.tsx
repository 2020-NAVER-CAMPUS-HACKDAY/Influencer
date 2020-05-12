import React from 'react';
import AppBar from 'components/AppBar';
import { AppColor } from 'constant';
import Logo from 'components/Logo';

const MyPage: React.FC = () => (
      <>
        <AppBar backgroundColor={AppColor.MAIN_HEADER} isNotFixed>
            <Logo pageName='쇼핑MY'/>

        </AppBar>
      </>
);

export default MyPage;
