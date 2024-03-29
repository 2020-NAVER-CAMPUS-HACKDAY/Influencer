import React, { ReactElement } from 'react';
import { AppColor } from 'constant';

const UnclickedGrid = (): ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={AppColor.BLACK20}>
    <path d="M11 11h-11v-11h11v11zm13 0h-11v-11h11v11zm-13 13h-11v-11h11v11zm13 0h-11v-11h11v11z"/>
  </svg>
);

export default UnclickedGrid;
