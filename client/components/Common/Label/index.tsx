import React from 'react';
import clsx from 'clsx';
import useStyles from './styles';

export interface LogoProps {
  name?: string;
  color?: string;
  fontSize?: number;
  className?: string;
}

const Label: React.FC<LogoProps> = (props) => {
  const classes = useStyles(props);
  const { name, className } = props;

  return (
    <div id={name} className={clsx(classes.logo, className)}>
      {name ?? 'INFLUENCER'}
    </div>
  );
};

export default Label;
