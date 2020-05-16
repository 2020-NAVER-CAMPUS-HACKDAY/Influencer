import React, { useState } from 'react';
import LikeListHeader from 'components/LikeList/LikeListHeader';
import LikeListBar from 'components/LikeList/LikeListBar';
import LikeListItem from 'components/LikeList/LikeListItem';
import ImageItem from 'components/LikeList/LikeGridViewItem/ImageItem';
import LikeGridViewItemWrapper from 'components/LikeList/LikeGridViewItem/LikeGridViewItemWrapper';
import likeListDummmyDatas from 'views/likeList/likeListDummyData';
import { orderBy, uniq } from 'lodash';
import TopButton from 'components/Common/TopButton';
import LikeGridViewItem from 'components/LikeList/LikeGridViewItem';
import { IMAGE_DATA_SIZE } from 'constant';
import { ImageSizeProps } from 'components/LikeList/LikeGridViewItem/interface';

const getImageDataSize = (length: number, index: number): ImageSizeProps => {
  if (length === 1) return IMAGE_DATA_SIZE[0];
  if (length === 2 || (length === 3 && index === 0)) return IMAGE_DATA_SIZE[1];
  return IMAGE_DATA_SIZE[2];
};

const GridViewItem = uniq(likeListDummmyDatas.map((item) => item.category))
  .map((category) => {
    const GridViewItemData = orderBy(
      likeListDummmyDatas
        .filter((item) => item.category === category),
      ['likeDate'],
      ['desc'],
    ).filter((item, index) => index < 4);

    return (
      <LikeGridViewItemWrapper key={category}>
        {GridViewItemData
          .map((item, index) => <ImageItem
            key={item.productId}
            item={item}
            imageSize={getImageDataSize(GridViewItemData.length, index)}
          />)}
      </LikeGridViewItemWrapper>
    );
  });


const likeListItemList = orderBy(likeListDummmyDatas, ['likeDate'], ['desc'])
  .map((likeItem) => (
    <LikeListItem key={likeItem.productId} item={likeItem}/>
  ));


const LikeList: React.FC = () => {
  const [listClicked, setListClicked] = useState(true);
  const [gridClicked, setGridClicked] = useState(false);

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
      {gridClicked && <LikeGridViewItem>{GridViewItem}</LikeGridViewItem>}
      <TopButton/>
    </>
  );
};
export default LikeList;
