import React, { FC } from 'react';
import clsx from 'clsx';
import Router from 'next/router';
import useStyles from './styles';

interface SVGButtonProps {
  className?: string;
  handleClick?: () => void;
}

const SVGButton: FC<SVGButtonProps> = (props) => {
  const classes = useStyles();
  const { className, handleClick, children } = props;

  const goMy = (): void => {
    Router.push('/my', undefined, { shallow: true });
  };

  return (
    <button
      className={clsx(classes.button, className)}
      onClick={handleClick ?? goMy}>
      {children}
    </button>
  );
};

export default SVGButton;
