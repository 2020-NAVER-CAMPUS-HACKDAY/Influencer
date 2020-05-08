import React from 'react';
import useStyles from 'components/Content/styles';

interface ContentProps {
  children?: React.ReactNode;
}

const Content: React.FunctionComponent<ContentProps> = (props) => {
  const { children } = props;
  const classes = useStyles(props);

  return <main className={classes.main}>{children}</main>;
};

export default Content;
