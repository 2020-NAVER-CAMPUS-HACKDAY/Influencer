import React from 'react';
import useStyles from 'components/Content/styles';

const Content: React.FunctionComponent = (props) => {
  const { children } = props;
  const classes = useStyles();

  return <main className={classes.main}>{children}</main>;
};

export default Content;
