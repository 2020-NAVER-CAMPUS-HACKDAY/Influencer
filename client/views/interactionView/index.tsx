import React, { FC, useState, useEffect } from 'react';
import { ProductProps } from 'components/Interaction/SwiperItem/interface';
import useStyles from 'views/interactionView/styles';
import MainHeader from 'components/Main/MainHeader';
import Swiper from 'components/Interaction/Swiper';
import InteractionButton from 'components/Interaction/InteractionButton';
import { Category } from 'interfaces/category';
import { PRODUCT_PAGE_API, PRODUCT_CATEGORY } from 'constant';
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
  categoryArray: Category[];
}

const InteractionPage: FC<InteractionPageProps> = (props) => {
  const classes = useStyles();
  const {
    setCurrentCategory,
    setPage,
    currentCategory,
    page,
    categoryArray,
  } = props;
  const [categoryState, setCategoryState] = useState<CategoryStateIndex>({
    prev: null, current: 0, next: 1,
  });
  const [productData, setProductData] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cardNum, setCardNum] = useState<number>(0);

  useEffect(() => {
    async function fetchProductData(categoryId: string): Promise<void> {
      try {
        const getProductUrl = process.env.SERVER_URL + PRODUCT_PAGE_API + PRODUCT_CATEGORY;
        const response = await fetch(`${getProductUrl}${categoryId}`,
          {
            method: 'GET',
          });
        const result = await response.json();
        setProductData(result.products);
        setCardNum(result.products.length);
        setIsLoading(false);
      } catch (err) {
        setProductData([]);
        setIsLoading(false);
      }
    }

    fetchProductData(currentCategory.categoryId);
  }, [currentCategory, page]);

  function handleClick(index: number): void {
    setCategoryState({ prev: index - 1, current: index, next: index + 1 });
    setCurrentCategory(categoryArray[index]);
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
            cardNum={cardNum}
          />
          <div className={classes.footer}>
            <div className={classes.interactionButton}>
              <InteractionButton
                category={categoryArray[categoryState.prev]}
                categoryIndex={categoryState.prev}
                isPrev={true}
                handleClick={handleClick} />
              <InteractionButton
                category={categoryArray[categoryState.current]} />
              <InteractionButton
                category={categoryArray[categoryState.next]}
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
    categoryArray: state.categoryReducer.categoryArray,
  }),
  (dispatch) => ({
    setCurrentCategory: bindActionCreators(interactionActions.setCurrentCategory, dispatch),
    setPage: bindActionCreators(interactionActions.setPage, dispatch),
  }),
)(InteractionPage);
