import React from 'react';
import LikeListHeader from 'components/LikeListHeader';
import LikeListBar from 'components/LikeListBar';
import LikeListItem from 'components/LikeListItem';
import likeListDummmyDatas from 'views/likeList/likeListDummyData';
import { orderBy } from 'lodash';

const likeListItemList = orderBy(likeListDummmyDatas, ['likeDate'], ['desc'])
  .map((likeItem) => (
    <LikeListItem key={likeItem.productId} item={likeItem}/>
  ));

const LikeList: React.FC = () => (
    <>
      <LikeListHeader/>
      <LikeListBar/>
      {likeListItemList}
    </>
);

export default LikeList;
