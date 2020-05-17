import React from 'react';
import useStyles from 'components/Common/AppBar/styles';
import MaterialAppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';

export interface BarProps {
  isNotFixed?: boolean;
  backgroundColor?: string;
  backgroundImage?: string;
  height?: string;
  rootClassName?: string;
  containerClassName?: string;
}

const AppBar: React.FunctionComponent<BarProps> = (props) => {
  const classes = useStyles(props);
  const { children, rootClassName, containerClassName } = props;

  return (
    <MaterialAppBar className={clsx(classes.root, rootClassName)}>
      <div className={clsx(classes.container, containerClassName)}>
        {children}
      </div>
    </MaterialAppBar>
  );
};

export default AppBar;
