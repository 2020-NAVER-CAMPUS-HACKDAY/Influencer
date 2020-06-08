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
    <IntersectionObserver fetchApi={fetchApi} isFetchTrue={isFetchTrue}>
      {props.products.map((el) => (
        <ProductItem key={el.productNo} {...el} />
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
