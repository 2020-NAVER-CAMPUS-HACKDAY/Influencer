import React from 'react';
import useStyles from 'components/Layout/styles';
import Content from 'components/Content';
import AppBar from 'components/AppBar';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FunctionComponent<LayoutProps> = (props) => {
  const { children } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.layout}>
      <AppBar />
      <Content>{children}</Content>
    </div>
  );
};

export default Layout;
