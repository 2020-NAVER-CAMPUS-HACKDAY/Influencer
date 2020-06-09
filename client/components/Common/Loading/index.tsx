import React, { FC } from 'react';
import useStyles from '../IntersectionObserverList/styles';

const Loading: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.loading}>
      <div className={classes.spinner} />
    </div>
  );
};
export default Loading;
