import React, { FC } from 'react';
import useStyles from 'components/LikeList/LikeGridViewItem/styles';

const LikeGridViewItemWrapper: FC = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {props.children}
    </div>
  );
};

export default LikeGridViewItemWrapper;
