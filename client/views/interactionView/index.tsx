import React, { useState } from 'react';
import useStyles from 'views/interactionView/styles';
import MainHeader from 'components/Main/MainHeader';
import Swiper from 'components/Interaction/Swiper';
import InteractionButton from 'components/Interaction/InteractionButton';
import { InteractionDummyData, SelectedCategoryDummyData } from 'views/interactionView/InteractionDummyData';

interface CategoryStateIndex {
  prev: number;
  current: number;
  next: number;
}

const Interaction: React.FC = () => {
  const classes = useStyles();
  const [categoryState, setCategoryState] = useState<CategoryStateIndex>({
    prev: null, current: 0, next: 1,
  });

  function handleClick(index: number): void {
    setCategoryState({ prev: index - 1, current: index, next: index + 1 });
  }

  return (
    <div className={classes.root}>
      <MainHeader>
        <div className={classes.swiper}>
          <Swiper products={InteractionDummyData} />
          <div className={classes.footer}>
            <div className={classes.interactionButton}>
              <InteractionButton
                category={SelectedCategoryDummyData[categoryState.prev]}
                categoryIndex={categoryState.prev}
                isPrev={true}
                handleClick={handleClick} />
              <InteractionButton
                category={SelectedCategoryDummyData[categoryState.current]} />
              <InteractionButton
                category={SelectedCategoryDummyData[categoryState.next]}
                categoryIndex={categoryState.next}
                isPrev={false}
                handleClick={handleClick} />
            </div>
          </div>
        </div>
      </MainHeader>
    </div>
  );
};

export default Interaction;
