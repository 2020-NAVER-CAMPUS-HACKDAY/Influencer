import React, { FC } from 'react';
import useStyles from './styles';

const SVGButton: FC = (props) => {
  const classes = useStyles();

  return (
      <button className={classes.button}>
        {props.children}
      </button>
  );
};

export default SVGButton;
