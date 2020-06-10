import React, { FC } from 'react';
import MainHeader from 'components/Main/MainHeader';
import ProductList from 'components/ProductList';

const Home: FC = () => (
  <>
    <MainHeader />
    <ProductList />
  </>
);

export default Home;
