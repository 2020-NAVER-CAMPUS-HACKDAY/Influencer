import React from 'react';
import AppBar from 'components/AppBar';
import { AppColor } from 'constant';
import Label from 'components/Label';

const LikeListHeader: React.FC = () => (
      <>
        <AppBar backgroundImage={AppColor.MAIN_HEADER} isNotFixed>
            <Label name='쇼핑MY'/>
        </AppBar>
      </>
);

export default LikeListHeader;
