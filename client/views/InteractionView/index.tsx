import React from 'react';
import useStyles from 'views/InteractionView/styles';
import MainHeader from 'components/MainHeader';
import Swiper from 'components/Swiper';
import InteractionDummyData from 'views/InteractionView/InteractionDummyData';

const Interaction: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MainHeader>
        <Swiper productData={InteractionDummyData} />
      </MainHeader>
    </div>
  );
};

export default Interaction;
