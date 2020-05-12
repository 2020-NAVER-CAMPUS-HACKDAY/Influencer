import React from 'react';
import useStyles from 'components/AppBar/styles';
import MaterialAppBar from '@material-ui/core/AppBar';

export interface BarProps {
  isNotFixed?: boolean;
  backgroundColor?: string;
}

const AppBar: React.FunctionComponent<BarProps> = (props) => {
  const classes = useStyles(props);
  const { children } = props;

  return (
  <MaterialAppBar className={classes.root}>
    <div className={classes.container}>
      {children}
    </div>
  </MaterialAppBar>
  );
};

export default AppBar;
