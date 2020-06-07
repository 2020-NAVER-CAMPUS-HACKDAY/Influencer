import React, { FC } from 'react';
import useStyles from './styles';

const Heart: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.heart} />
    </div>
  );
};
export default Heart;
