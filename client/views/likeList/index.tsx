import React, { useState } from 'react';
import LikeListHeader from 'components/LikeList/LikeListHeader';
import LikeListBar from 'components/LikeList/LikeListBar';
import LikeListItem from 'components/LikeList/LikeListItem';
import likeListDummmyDatas from 'views/likeList/likeListDummyData';
import { orderBy } from 'lodash';
import TopButton from 'components/Common/TopButton';
import LikeGridView from 'components/LikeList/LikeGridView';

const likeListItemList = orderBy(likeListDummmyDatas, ['likeDate'], ['desc'])
  .map((likeItem) => (
    <LikeListItem key={likeItem.productId} item={likeItem}/>
  ));

const LikeList: React.FC = () => {
  const [listClicked, setListClicked] = useState<boolean>(true);
  const [gridClicked, setGridClicked] = useState<boolean>(false);

  const handleListClicked = (): void => {
    if (!listClicked && gridClicked) {
      setListClicked(true);
      setGridClicked(false);
    }
  };
  const handleGridClicked = (): void => {
    if (listClicked && !gridClicked) {
      setListClicked(false);
      setGridClicked(true);
    }
  };

  return (
    <>
      <LikeListHeader/>
      <LikeListBar
        listClicked={listClicked}
        gridClicked={gridClicked}
        handleListClicked={handleListClicked}
        handleGridClicked={handleGridClicked}
      />
      {listClicked && likeListItemList}
      {gridClicked && <LikeGridView itemArray={likeListDummmyDatas} />}
      <TopButton/>
    </>
  );
};
export default LikeList;
