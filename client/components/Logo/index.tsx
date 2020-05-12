import React from 'react';
import useStyles from './styles';

export interface LogoProps {
  pageName?: string;
  color?: string;
}

const Logo: React.FC<LogoProps> = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.logo}>
      {props.pageName ?? 'INFLUENCER'}
    </div>
  );
};

export default Logo;
