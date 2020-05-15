import React, { ReactElement } from 'react';
import useStyles from 'svgs/Share/styles';

const Share = (): ReactElement => {
  const classes = useStyles();

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20pt" height="20pt" viewBox="0 0 36 36" version="1.1">
      <g id="surface1">
        <path className={classes.path}
          d="M 9 25.5 C 12.402344 10.679688 25.5 8 25.5 8 L 25.5 3 L 36 12.957031 L 25.5 23 L 25.5 18
        C 25.5 18 16.246094 17.742188 9 25.5 Z M 27 25.71875 L 27 30 L 3 30 L 3 12 L 12.898438
         12 C 14.050781 10.820312 15.238281 9.828125 16.40625 9 L 0 9 L 0 33 L 30 33 L 30
          22.847656 Z M 27 25.71875 "/>
      </g>
    </svg>
  );
};

export default Share;
