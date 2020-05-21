import React, { FC } from 'react';
import useStyles from 'components/Main/Content/styles';

const Content: FC = (props) => {
  const { children } = props;
  const classes = useStyles();

  return <main className={classes.main}>{children}</main>;
};

export default Content;
