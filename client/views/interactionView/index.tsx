import React, { useState } from 'react';
import { ProductProps } from 'components/Interaction/SwiperItem/interface';
import useStyles from 'views/interactionView/styles';
import MainHeader from 'components/Main/MainHeader';
import Swiper from 'components/Interaction/Swiper';
import InteractionButton from 'components/Interaction/InteractionButton';
import { InteractionDummyData, SelectedCategoryDummyData } from 'views/interactionView/interactionDummyData';

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
  const [productData, setProductData] = useState<ProductProps[]>(InteractionDummyData);

  function fetchProductData(categoryId: string): void {
    // TODO(seogeurim) categoryId에 맞는 새로운 데이터를 불러와야 한다. (InteractionDummyData)
    // TODO(seogeurim) Interaction 렌더링 됐을 때 첫번째 카테고리의 데이터 불러와야 한다.
    // TODO(seogeurim) setProductData => productData(state) => Swiper에 계속 반영되어야 한다.
  }

  function handleClick(index: number): void {
    setCategoryState({ prev: index - 1, current: index, next: index + 1 });
    fetchProductData(SelectedCategoryDummyData[index].categoryId);
  }

  return (
    <div className={classes.root}>
      <MainHeader>
        <div className={classes.swiper}>
          <Swiper products={productData} />
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
