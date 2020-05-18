import { FC } from 'react';
import InfinityList from 'components/Common/InfinityList';
import ProductItem from 'components/ProductListView/ProductItem';

const fakeFetch = () => {
  return new Promise((res) => {
    const fakeProducts = new Array(30).fill(null).map((_) => ({
      imageUri: `https://naver.github.io/egjs-infinitegrid/assets/image/${(
        Math.random() * 59 +
        1
      ).toFixed(0)}.jpg`,
      company: '꽃세상컴퍼니',
      id: 1234563,
      price: 3000,
      name: '벚꽃나무1',
      category: 50000001,
      date: '2020-02-08T15:47:36.479+00:00',
    }));

    setTimeout(() => res(fakeProducts), 300);
  });
};

interface ProductItemProps {}

const ProductListView: FC<ProductItemProps> = () => {
  return <InfinityList loadItems={fakeFetch} ItemComponent={ProductItem} />;
};

export default ProductListView;
