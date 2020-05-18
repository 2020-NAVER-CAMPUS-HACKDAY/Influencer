import React, { FC } from 'react';
import useStyles from 'views/interactionView/styles';
import MainHeader from 'components/Main/MainHeader';
import Swiper from 'components/Interaction/Swiper';
import InteractionButton from 'components/Interaction/InteractionButton';
import { InteractionDummyData } from 'views/interactionView/InteractionDummyData';

const Interaction: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MainHeader>
        <div className={classes.swiper}>
          <Swiper products={InteractionDummyData} />
          <div className={classes.footer}>
            <div className={classes.interactionButton}>
              <InteractionButton categoryName={'남성의류'} isPrev={true} />
              <InteractionButton categoryName={'여성의류'} isPrev={false} />
            </div>
          </div>
        </div>
      </MainHeader>
    </div>
  );
};

export default Interaction;
