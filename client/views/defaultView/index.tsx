import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  ProductProps,
  productActions,
  ProductActionsProps,
} from 'redux/ducks/product';
import MainHeader from 'components/Main/MainHeader';
import ProductListView from 'components/ProductListView';

interface DefaultProps extends ProductProps, ProductActionsProps {
  data: string;
}

const Home: React.FC<DefaultProps> = () => (
  <MainHeader>
    <ProductListView dummy={'dg'} />
  </MainHeader>
);

export default connect<ProductProps, void>(
  (state: ProductProps) => ({
    productArray: state.productArray,
  }),
  (dispatch) => ({
    addProduct: bindActionCreators(productActions.addProduct, dispatch),
  }),
)(Home);
