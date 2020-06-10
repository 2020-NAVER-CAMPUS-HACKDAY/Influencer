import React, { FC, useState } from 'react';
import IntersectionObserver from 'components/Common/IntersectionObserverList';
import ProductItem from 'components/ProductList/ProductItem';
import { getProductDataArray } from 'network/productApi';
import { connect } from 'react-redux';
import { productActions, ProductActionsProps } from 'redux/ducks/product';
import { ProductDucksProps } from 'interfaces/product';
import { Types } from 'redux/ducks';
import { bindActionCreators } from 'redux';

const ProductList: FC<ProductDucksProps & ProductActionsProps> = (props) => {
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
    <IntersectionObserver
      fetchApi={fetchApi}
      isFetchTrue={isFetchTrue}
      isLazyLoading
      items={props.products}
    >
      {props.products.map((el, i) => (
        // key 값으로 arr의 index 값을 넣는 건 성능 상 안 좋지만, productNo이 겹치는 게 많아서 arr의 index를 key로 할당함.
        <ProductItem key={i} {...el} isLazy />
      ))}
    </IntersectionObserver>
  );
};

export default connect<ProductDucksProps, void>(
  (state: Types) => ({
    products: state.productReducer.products,
  }),
  (dispatch) => ({
    addProducts: bindActionCreators(productActions.addProducts, dispatch),
  }),
)(ProductList);
