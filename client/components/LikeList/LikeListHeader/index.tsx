import React, { FC } from 'react';
import AppBar from 'components/Common/AppBar';
import { AppColor } from 'constant';
import Label from 'components/Common/Label';

const LikeListHeader: FC = () => (
  <>
    <AppBar backgroundImage={AppColor.MAIN_HEADER} isNotFixed>
      <Label name='쇼핑MY'/>
    </AppBar>
  </>
);

export default LikeListHeader;
