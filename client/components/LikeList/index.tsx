import React, { FC } from 'react';
import { LikeListProps } from 'components/LikeList/LikeGridView/interface';
import { orderBy } from 'lodash';
import LikeListItem from 'components/LikeList/LikeListItem';
import LikeListCategory from 'components/LikeList/LikeListCategory';
import useStyles from 'components/LikeList/LikeGridView/styles';
import IntersectionObserverList from 'components/Common/IntersectionObserverList';

const LikeListComponent: FC<LikeListProps> = (props) => {
  const classes = useStyles();
  const {
    categoryArray,
    clickedCategory,
    handleItemClick,
    likeList,
    fetchAPI,
    firstFetchingTrue,
    isFetchTrue,
  } = props;
  return (
    <>
      <LikeListCategory
        categoryArray={categoryArray}
        clickedCategory={clickedCategory}
        handleItemClick={handleItemClick}
      />
      <IntersectionObserverList isFetchTrue={isFetchTrue} className={classes.wrapper}
        firstFetchingTrue={firstFetchingTrue}
        fetchApi={fetchAPI}
      >
        {
          orderBy(likeList, ['modeDate'], ['desc'])
            .map((likeItem) => <LikeListItem
              key={likeItem?.productNo}
              product={likeItem}/>)
        }
      </IntersectionObserverList>
    </>
  );
};

export default LikeListComponent;
