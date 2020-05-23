import React, { FC } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { likeListActions } from '../../redux/ducks/likeList';
import { LikeListDucksProps } from '../../redux/ducks/Interface';
import { Types } from '../../redux/ducks';

const Home: FC = (props) => {

  return (
    <div></div>
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
