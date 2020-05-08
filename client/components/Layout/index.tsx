import React from 'react';

import useStyles from 'components/Layout/styles';
import Content from 'components/Content';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FunctionComponent<LayoutProps> = (props) => {
  const { children } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.layout}>
      <Content>{children}</Content>
    </div>
  );
};

export default Layout;
