import React, { FC, useState, useEffect } from 'react';
import { ProductProps } from 'components/Interaction/SwiperItem/interface';
import useStyles from 'views/interactionView/styles';
import MainHeader from 'components/Main/MainHeader';
import Swiper from 'components/Interaction/Swiper';
import InteractionButton from 'components/Interaction/InteractionButton';
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
  currentCategory: Category;
  page: number;
}

const InteractionPage: FC<InteractionPageProps> = (props) => {
  const classes = useStyles();
  // TODO(seogeurim) 민지님 카테고리 화면과 합치기
  const categoryData = SelectedCategoryDummyData;
  const { setCurrentCategory, currentCategory, page } = props;
  const [categoryState, setCategoryState] = useState<CategoryStateIndex>({
    prev: null, current: 0, next: 1,
  });
  const [productData, setProductData] = useState<ProductProps[]>();

  const fetchProductData = async (categoryId: string, pageNo: number) => {
    try {
      // TODO(seogeurim) replace hard coding server URL
      const response = await fetch(`http://localhost:5000/api/products/category/${categoryId}?page=${pageNo}&limit=10`, {
        method: 'GET',
      });
      const result = await response.json();
      const products = result.products.map(({
        productId, productName, productImages, salePrice,
      }) => ({
        productId, productName, productImages, salePrice,
      }));
      setProductData(products);
    } catch (err) {
      setProductData([]);
    }
  };

  useEffect(() => {
    setCurrentCategory(categoryData[categoryState.current]);
    fetchProductData(currentCategory.id, page);
  }, [categoryData, categoryState, setCurrentCategory, currentCategory, page]);

  function handleClick(index: number): void {
    setCategoryState({ prev: index - 1, current: index, next: index + 1 });
    setCurrentCategory(categoryData[index]);
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

export default connect<InteractionProps, void>(
  (state: Types) => ({
    currentCategory: state.interactionReducer.currentCategory,
    page: state.interactionReducer.page,
  }),
  (dispatch) => ({
    setCurrentCategory: bindActionCreators(interactionActions.setCurrentCategory, dispatch),
  }),
)(InteractionPage);
