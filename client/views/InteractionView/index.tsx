import React from 'react';
import useStyles from 'views/InteractionView/styles';
import MainHeader from 'components/Main/MainHeader';
import Swiper from 'components/Swiper';

const Interaction: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MainHeader>
        <Swiper />
      </MainHeader>
    </div>
  );
};

export default Interaction;
