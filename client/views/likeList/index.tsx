import React, { useState } from 'react';
import LikeListHeader from 'components/LikeList/LikeListHeader';
import LikeListBar from 'components/LikeList/LikeListBar';
import LikeListItem from 'components/LikeList/LikeListItem';
import { likeListDummmyDatas, likeGridViewDummyData } from 'views/likeList/likeListDummyData';
import { orderBy } from 'lodash';
import TopButton from 'components/Common/TopButton';
import LikeGridView from 'components/LikeList/LikeGridView';
import LikeListCategory from 'components/LikeList/LikeListCategory';
import { Category } from 'constant';

const LikeList: React.FC = () => {
  const [listClicked, setListClicked] = useState<boolean>(true);
  const [gridClicked, setGridClicked] = useState<boolean>(false);
  const [
    clickedCategory,
    setClickedCategory,
  ] = useState<string>(Category[likeGridViewDummyData[0].category]);

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

  const handleCategoryClick = (event): void => {
    setClickedCategory(event.target.id);
  }

  const likeListItemList = <>
    <LikeListCategory
      clickedCategory={clickedCategory}
      handleCategoryClick={handleCategoryClick}
      itemArray={likeGridViewDummyData}
    />
    {orderBy(likeListDummmyDatas, ['likeDate'], ['desc'])
      .filter((likeItem) => Category[likeItem.category] === clickedCategory)
      .map((likeItem) => (
        <LikeListItem key={likeItem.productId} item={likeItem}/>
      ))}
  </>;

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
