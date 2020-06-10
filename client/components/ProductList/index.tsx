import React, { FC } from 'react';
import IntersectionObserver from 'components/Common/IntersectionObserverList';
import ProductItem from 'components/ProductList/ProductItem';
import { Product } from 'interfaces/product';

interface ProductListProps {
  isFetchTrue: boolean;
  fetchApi: () => Promise<void>;
  items: Product[];
}
const ProductList: FC<ProductListProps> = (props) => {
  const { isFetchTrue, fetchApi, items } = props;
  return (
    <IntersectionObserver
      fetchApi={fetchApi}
      isFetchTrue={isFetchTrue}
      isLazyLoading
      items={items}
    >
      {items.map((el, i) => (
        // key 값으로 arr의 index 값을 넣는 건 성능 상 안 좋지만, productNo이 겹치는 게 많아서 arr의 index를 key로 할당함.
        <ProductItem key={i} {...el} isLazy/>
      ))}
    </IntersectionObserver>
  );
};

export default ProductList;
