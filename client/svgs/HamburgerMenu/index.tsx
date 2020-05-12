import React, { ReactElement } from 'react';

const SvgComponent = (): ReactElement => (
  <svg width={24} height={24} viewBox="0 0 100 80">
    <rect width="100" height="13" fill="white"/>
    <rect y="30" width="100" height="13" fill="white"/>
    <rect y="60" width="100" height="13" fill="white"/>
  </svg>
);

export default SvgComponent;
