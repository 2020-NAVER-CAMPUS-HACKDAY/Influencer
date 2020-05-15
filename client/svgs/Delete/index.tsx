import React, { ReactElement } from 'react';
import useStyles from 'svgs/TopDirection/styles';
import { AppColor } from 'constant';

const Delete = (): ReactElement => {
  const classes = useStyles();

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18pt" height="18pt" viewBox="0 0 18 18" version="1.1">
      <g id="surface1">
        <path className={classes.path} fill={AppColor.BLACK50}
          d="M 9 8.46875 L 16.71875 0.75 L 17.25 1.28125 L 9.53125
              9 L 17.25 16.71875 L 16.71875 17.25 L 9 9.53125 L 1.28125
               17.25 L 0.75 16.71875 L 8.46875 9 L 0.75 1.28125 L 1.28125
                0.75 Z M 9 8.46875 "/>
      </g>
    </svg>
  );
};

export default Delete;
