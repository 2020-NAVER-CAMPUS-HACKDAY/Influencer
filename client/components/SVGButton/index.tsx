import React, { FC } from 'react';
import clsx from 'clsx';
import useStyles from './styles';

interface SVGButtonProps {
  className?: string;
  handleClick?: () => void;
}
const SVGButton: FC = (props) => {
  const classes = useStyles();

  return (
      <button className={clsx(classes.button, className)} onClick={handleClick}>
        {children}
      </button>
  );
};

export default SVGButton;
