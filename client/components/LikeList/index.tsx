import React, { FC } from 'react';
import { LikeListCategoryProps } from 'components/LikeList/LikeGridView/interface';
import { LikeListDataProps } from 'redux/ducks/Interface';
import { orderBy } from 'lodash';
import LikeListItem from 'components/LikeList/LikeListItem';
import LikeListCategory from 'components/LikeList/LikeListCategory';

interface LikeListProps extends LikeListCategoryProps {
  likeDataResponse: LikeListDataProps;
}

const LikeListComponent: FC<LikeListProps> = (props) => {
  const {
    categoryArray, clickedCategory, handleItemClick, likeDataResponse,
  } = props;
  return (
    <>
      <LikeListCategory
        categoryArray={categoryArray}
        clickedCategory={clickedCategory}
        handleItemClick={handleItemClick}
      />
      {orderBy(categoryArray.map((category) => likeDataResponse[category])
        .filter(
          (likeCategoryObject) => likeCategoryObject[0]
            .category.category1Name === clickedCategory,
        ), ['modeDate'], ['desc'])
        .map((likeDataArray) => likeDataArray
          .map((likeItem) => <LikeListItem key={likeItem?.productNo} product={likeItem}/>))
      }
    </>
  );
};

export default LikeListComponent;
