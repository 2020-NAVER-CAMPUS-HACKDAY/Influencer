import React from 'react';
import useStyles from './styles';

const SVGButton: React.FC = (props) => {
  const classes = useStyles();

  return (
      <button className={classes.button}>
        {props.children}
      </button>
  );
};

export default SVGButton;
