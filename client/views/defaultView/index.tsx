import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  productActions,
  ProductActionsProps,
} from 'redux/ducks/product';
import MainHeader from 'components/Main/MainHeader';
import ProductListView from 'components/ProductListView';
import { ProductProps } from 'redux/ducks/productInterface';
import { PayloadAction } from 'typesafe-actions';

interface DefaultProps extends ProductProps, ProductActionsProps {
  data: string;
}

const Home: React.FC<DefaultProps> = (props) => {
  const { fetchAndAddProduct, getProductForId } = props;
  return (
    <MainHeader>
      <div onClick={(): PayloadAction<
      'product/FETCH_AND_ADD_PRODUCT_REQUEST',
      number
      > => fetchAndAddProduct(1)}>hello</div>
      <div onClick={(): PayloadAction<
      'product/GET_PRODUCT_FOR_ID',
      number
      > => getProductForId(100003)}>hi</div>
    </MainHeader>
  );
};

export default connect<ProductProps, void>(
  (state: ProductProps) => ({
    products: state.products,
    selectedProduct: state.selectedProduct,
  }),
  (dispatch) => ({
    fetchAndAddProduct: bindActionCreators(productActions.fetchAndAddProduct.request, dispatch),
    getProductForId: bindActionCreators(productActions.getProductForId, dispatch),
  }),
)(Home);
