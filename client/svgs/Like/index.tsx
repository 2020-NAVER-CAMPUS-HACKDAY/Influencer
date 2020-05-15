import React, { ReactElement } from 'react';
import useStyles from 'svgs/TopDirection/styles';

const Like = (): ReactElement => {
  const classes = useStyles();

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18pt" height="18pt" viewBox="0 0 30 30" version="1.1">
      <g id="surface1">
        <path className={classes.path}
          d="M 15 11.535156 C 15.292969 10.136719 16.933594 3.75 21.726562
       3.75 C 24.503906 3.75 27.5 5.6875 27.5 10.003906 C 27.5
        14.886719 22.964844 20.589844 15 25.789062 C 7.035156 20.589844
         2.5 14.886719 2.5 10.003906 C 2.5 5.648438 5.460938 3.746094 8.222656
          3.746094 C 13.125 3.746094 14.652344 10.15625 15 11.535156 Z M 0 10.003906
          C 0 15.089844 3.824219 21.855469 15 28.75 C 26.175781 21.855469 30 15.089844
          30 10.003906 C 30 0.0507812 17.941406 -1.28125 15 5.332031 C 12.078125 -1.246094
           0 -0.00390625 0 10.003906 Z M 0 10.003906 "/>
      </g>
    </svg>
  );
};

export default Like;
