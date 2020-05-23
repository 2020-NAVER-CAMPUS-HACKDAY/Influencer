import React, { FC } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  productActions,
  ProductActionsProps,
  ProductProps,
} from 'redux/ducks/product';
import MainHeader from 'components/Main/MainHeader';
import { PayloadAction } from 'typesafe-actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { likeListActions, LikeListActionsProps } from '../../redux/ducks/likeList';
import { LikeListDucksProps } from '../../redux/ducks/Interface';
import { Types } from '../../redux/ducks';

interface DefaultProps extends LikeListDucksProps, LikeListActionsProps {
}

const Home: FC<DefaultProps> = (props) => {
  const { fetchAndAddProduct, getProductForId } = props;

  return (
    <MainHeader>
      <div onClick={(): PayloadAction<
      'likeList/FETCH_LIKE_PRODUCT_REQUEST',
      number
      > => fetchLikeProduct(0)}>dgdsgsd</div>
    </MainHeader>
  );
};

export default connect<LikeListDucksProps, void>(
  (state: Types) => ({
    data: state.likeReducer.data,
    pageId: state.likeReducer.pageId,
    isFetchTrue: state.likeReducer.isFetchTrue,
  }),
  (dispatch) => ({
    fetchLikeProduct: bindActionCreators(likeListActions.fetchLikeProduct.request, dispatch),
    setLikeProduct: bindActionCreators(likeListActions.setLikeProduct, dispatch),
    setFetchFalse: bindActionCreators(likeListActions.setFetchFalse, dispatch),
  }),
)(Home);
