import React, { FC, useState, useEffect } from 'react';
import { ProductProps } from 'components/Interaction/SwiperItem/interface';
import useStyles from 'views/interactionView/styles';
import MainHeader from 'components/Main/MainHeader';
import Swiper from 'components/Interaction/Swiper';
import InteractionButton from 'components/Interaction/InteractionButton';
import { PRODUCTS_BY_CATEGORY_API, PAGE_ADD, LIMIT_ADD } from 'constant';
import { Category, SelectedCategoryDummyData } from 'views/interactionView/interactionDummyData';
// REDUX
import { interactionActions, InteractionProps } from 'redux/ducks/interaction';
import { connect } from 'react-redux';
import { Types } from 'redux/ducks';
import { bindActionCreators } from 'redux';
import { PayloadActionCreator } from 'typesafe-actions';

interface CategoryStateIndex {
  prev: number;
  current: number;
  next: number;
}

interface InteractionPageProps extends InteractionProps{
  setCurrentCategory: PayloadActionCreator<'interaction/SET_CURRENT_CATEGORY', Category>;
  setPage: () => void;
  currentCategory: Category;
  page: number;
}

const InteractionPage: FC<InteractionPageProps> = (props) => {
  // TODO(seogeurim) 민지님 카테고리와 합치기
  const categoryData = SelectedCategoryDummyData;
  const classes = useStyles();
  const {
    setCurrentCategory,
    setPage,
    currentCategory,
    page,
  } = props;
  const [categoryState, setCategoryState] = useState<CategoryStateIndex>({
    prev: null, current: 0, next: 1,
  });
  const [productData, setProductData] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProductData(categoryId: string, pageNo: number): Promise<void> {
      try {
        const response = await fetch(`${process.env.SERVER_URL}${PRODUCTS_BY_CATEGORY_API}${categoryId}${PAGE_ADD}${pageNo}${LIMIT_ADD}10`, {
          method: 'GET',
        });
        const result = await response.json();
        setProductData(result.products);
        setIsLoading(false);
      } catch (err) {
        setProductData([]);
        setIsLoading(false);
      }
    }

    fetchProductData(currentCategory.id, page);
  }, [currentCategory, page]);

  function handleClick(index: number): void {
    setCategoryState({ prev: index - 1, current: index, next: index + 1 });
    setCurrentCategory(categoryData[index]);
    setProductData([]);
    setIsLoading(true);
  }

  return (
    <div className={classes.root}>
      <MainHeader>
        <div className={classes.swiper}>
          <Swiper
            products={productData}
            setPage={setPage}
            page={page}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
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

export default connect<InteractionProps, void>(
  (state: Types) => ({
    currentCategory: state.interactionReducer.currentCategory,
    page: state.interactionReducer.page,
  }),
  (dispatch) => ({
    setCurrentCategory: bindActionCreators(interactionActions.setCurrentCategory, dispatch),
    setPage: bindActionCreators(interactionActions.setPage, dispatch),
  }),
)(InteractionPage);
