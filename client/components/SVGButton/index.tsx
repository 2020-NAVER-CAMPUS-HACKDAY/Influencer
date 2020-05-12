import React from 'react';
import useStyles from './styles';
import clsx from 'clsx';

interface SVGButtonProps {
  className?: string;
  handleClick?: ()=> void;
};

const SVGButton: React.FC<SVGButtonProps> = (props) => {
  const classes = useStyles();
  const { className, handleClick, children } = props;
  return (
      <button className={clsx(classes.button, className)} onClick={handleClick}>
        {children}
      </button>
  );
};

export default SVGButton;
