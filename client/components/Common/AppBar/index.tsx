import React from 'react';
import useStyles from 'components/Common/AppBar/styles';
import MaterialAppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';

export interface BarProps {
  isNotFixed?: boolean;
  backgroundColor?: string;
  backgroundImage?: string;
  height?: string;
  className?: string;
}

const AppBar: React.FunctionComponent<BarProps> = (props) => {
  const classes = useStyles(props);
  const { children, className } = props;

  return (
    <MaterialAppBar className={classes.root}>
      <div className={clsx(classes.container, className)}>
        {children}
      </div>
    </MaterialAppBar>
  );
};

export default AppBar;
