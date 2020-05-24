import React, { FC } from 'react';
import useStyles from './styles';

const Loading: FC = () => {
  const classes = useStyles();

  return (
    <div
      className={classes.container}
      onClick={(e) => {
        e.preventDefault();
        console.log('asd');
      }}
    >
      <div className={classes.heart} />
    </div>
  );
};
export default Loading;
