import React, { FC } from 'react';
import useStyles from './styles';

export interface LogoProps {
  pageName?: string;
}

const Logo: FC<LogoProps> = (props) => {
  const classes = useStyles(props);

  return (
    <div className={classes.logo}>
      {props.pageName ?? 'INFLUENCER'}
    </div>
  );
};

export default Logo;
