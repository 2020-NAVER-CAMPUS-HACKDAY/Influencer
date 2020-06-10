import React, { FC, useState } from 'react';
import MainHeader from 'components/Main/MainHeader';
import ProductList from 'components/ProductList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProductDataArray } from '../../network/productApi';
import { ProductDucksProps } from '../../interfaces/product';
import { Types } from '../../redux/ducks';
import { productActions, ProductActionsProps } from '../../redux/ducks/product';

const Home: FC<ProductDucksProps & ProductActionsProps> = (props) => {
  const [page, setPage] = useState<number>(1);
  const [isFetchTrue, setIsFetchTrue] = useState<boolean>(true);

  const fetchApi = async (): Promise<void> => {
    const res = (await getProductDataArray(page)
      .then((res2) => res2.data)
      .catch(() => setIsFetchTrue(false))) as ProductDucksProps;
    props.addProducts(res.products);
    setPage(page + 1);
  };

  return (
    <>
      <MainHeader/>
      <ProductList
        isFetchTrue={isFetchTrue}
        fetchApi={fetchApi}
        items={props.products}
      />
    </>
  );
};

export default connect<ProductDucksProps, void>(
  (state: Types) => ({
    products: state.productReducer.products,
  }),
  (dispatch) => ({
    addProducts: bindActionCreators(productActions.addProducts, dispatch),
  }),
)(Home);
