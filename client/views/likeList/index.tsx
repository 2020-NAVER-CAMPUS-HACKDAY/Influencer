import React from 'react';
import LikeListHeader from 'components/LikeList/LikeListHeader';
import LikeListBar from 'components/LikeList/LikeListBar';
import LikeListItem from 'components/LikeList/LikeListItem';
import likeListDummmyDatas from 'views/likeList/likeListDummyData';
import { orderBy } from 'lodash';
import TopButton from 'components/Common/TopButton';

const likeListItemList = orderBy(likeListDummmyDatas, ['likeDate'], ['desc'])
  .map((likeItem) => (
    <LikeListItem key={likeItem.productId} item={likeItem}/>
  ));

const LikeList: React.FC = () => (
  <>
    <LikeListHeader/>
    <LikeListBar/>
    {likeListItemList}
    <TopButton/>
  </>
);

export default LikeList;
