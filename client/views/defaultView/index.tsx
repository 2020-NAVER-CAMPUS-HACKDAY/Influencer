import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ProductProps, productActions, ProductActionsProps } from 'redux/ducks/product';
import MainHeader from 'components/Main/MainHeader';
import { detailViewDataArray } from 'views/detailView/detailViewDummyData';

interface DefaultProps extends ProductProps, ProductActionsProps {
  data: string;
}

const Home: React.FC<DefaultProps> = (props) => {
  const { data, addProduct } = props;
  return (
    <MainHeader>
      <div onClick={() => addProduct(detailViewDataArray)}>
        This is Default Page.
      </div>
      <Link href="/interaction">
        <a>go to Interaction Page</a>
      </Link>
      <Link href="/detail/[productID]" as="/detail/aaaa">
        <a>
        go to Next Page
        </a>
      </Link>
      {data}
    </MainHeader>
  );
};

export default connect<ProductProps, void>(
  (state: ProductProps) => ({
    productArray: state.productArray,
  }),
  (dispatch) => ({
    addProduct: bindActionCreators(productActions.addProduct, dispatch),
  }),
)(Home);
