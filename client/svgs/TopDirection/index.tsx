import React, { ReactElement } from 'react';
import useStyles from 'svgs/TopDirection/styles';

const TopDirection = (): ReactElement => {
  const classes = useStyles();

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12pt" height="12pt" viewBox="0 0 12 12" version="1.1" transform="rotate(-90)" >
      <g id="surface1">
        <path className={classes.path} d="M 2 0.378906 L 9.1875 6 L 2 11.609375 L 2.308594 12 L 10 6 L 2.304688 0 Z M 2 0.378906 "/>
      </g>
    </svg>
  );
};

export default TopDirection;
