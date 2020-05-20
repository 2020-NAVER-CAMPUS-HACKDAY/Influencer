import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import useStyles from 'components/Common/OutlinedButton/styles';
import clsx from 'clsx';

interface OutlinedButtonProps {
  className?: string;
  handleClick?: () => void;
}

const OutlinedButton: FC<OutlinedButtonProps> = (props) => {
  const classes = useStyles();
  const { className, children, handleClick } = props;
  return (
    <Button className={clsx(classes.button, className)} onClick={handleClick}>
      {children}
    </Button>
  );
};

export default OutlinedButton;
