import React from 'react';
import useStyles from 'views/InteractionView/styles';
import MainHeader from 'components/MainHeader';
import Swiper from 'components/Swiper';
import InteractionButton from 'components/InteractionButton';
import InteractionDummyData from 'views/InteractionView/InteractionDummyData';

const Interaction: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MainHeader>
        <div className={classes.swiper}>
          <Swiper products={InteractionDummyData} />
          <div className={classes.footer}>
            <div className={classes.nextButton}>
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
