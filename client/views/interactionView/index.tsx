import React, { FC, useState } from 'react';
import { ProductProps } from 'components/Interaction/SwiperItem/interface';
import useStyles from 'views/interactionView/styles';
import MainHeader from 'components/Main/MainHeader';
import Swiper from 'components/Interaction/Swiper';
import InteractionButton from 'components/Interaction/InteractionButton';
import { Category } from 'views/interactionView/interactionDummyData';

interface CategoryStateIndex {
  prev: number;
  current: number;
  next: number;
}

interface InteractionPageProps {
  categoryData: Category[];
  productData: ProductProps[];
}

const InteractionPage: FC<InteractionPageProps> = (props) => {
  const classes = useStyles();
  const { categoryData, productData } = props;
  const [categoryState, setCategoryState] = useState<CategoryStateIndex>({
    prev: null, current: 0, next: 1,
  });

  function handleClick(index: number): void {
    setCategoryState({ prev: index - 1, current: index, next: index + 1 });
    // fetchProductData(SelectedCategoryDummyData[index].categoryId);
  }

  return (
    <div className={classes.root}>
      <MainHeader>
        <div className={classes.swiper}>
          <Swiper products={productData} />
          <div className={classes.footer}>
            <div className={classes.interactionButton}>
              <InteractionButton
                category={categoryData[categoryState.prev]}
                categoryIndex={categoryState.prev}
                isPrev={true}
                handleClick={handleClick} />
              <InteractionButton
                category={categoryData[categoryState.current]} />
              <InteractionButton
                category={categoryData[categoryState.next]}
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

export default InteractionPage;
