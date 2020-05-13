import React, { ReactElement } from 'react';
import { AppColor } from 'constant';

const Delete = (): ReactElement => (
  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" fill={AppColor.BLACK50}>
    <path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"/>
  </svg>
) 

export default Delete;
