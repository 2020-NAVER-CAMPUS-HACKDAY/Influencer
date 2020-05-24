import React, { FC, useState } from 'react';
import IntersectionObserver from 'components/Common/IntersectionObserverList';
import ProductItem from 'components/ProductListView/ProductItem';
import { getProductDataArray } from 'network/productApi';
import { connect } from 'react-redux';
import { productActions, ProductActionsProps } from '../../redux/ducks/product';
import { ProductProps } from '../../redux/ducks/Interface';
import { Types } from '../../redux/ducks';
import { bindActionCreators } from 'redux';

const ProductListView: FC<ProductProps & ProductActionsProps> = (props) => {
  const [page, setPage] = useState<number>(1);
  const [isFetchTrue, setIsFetchTrue] = useState<boolean>(true);

  const fetchApi = async () => {
    const res = (await getProductDataArray(page)
      .then((res) => res.data)
      .catch(() => setIsFetchTrue(false))) as ProductProps;
    props.addProducts(res.products);
    setPage(page + 1);
  };
  return (
    <IntersectionObserver fetchApi={fetchApi} isFetchTrue={isFetchTrue}>
      {props.products.map((el) => (
        <ProductItem {...el} />
      ))}
    </IntersectionObserver>
  );
};

export default connect<ProductProps, void>(
  (state: Types) => ({
    products: state.productReducer.products,
  }),
  (dispatch) => ({
    addProducts: bindActionCreators(productActions.addProducts, dispatch),
  }),
)(ProductListView);
