import React from 'react';
import useStyles from 'components/Swiper/styles';

const Swiper: React.FC = (props) => {
  const { children } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      Swiper
    </div>
  );
};

export default Swiper;
