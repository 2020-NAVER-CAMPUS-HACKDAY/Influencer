import React, { FC, useState, useEffect } from 'react';
import LikeListHeader from 'components/LikeList/LikeListHeader';
import LikeListBar from 'components/LikeList/LikeListBar';
import LikeListComponent from 'components/LikeList';
import TopButton from 'components/Common/TopButton';
import LikeGridView from 'components/LikeList/LikeGridView';
import {
  FetchGridViewProps,
  LikeGridViewProductProps,
} from 'components/LikeList/LikeGridView/interface';
import {
  Category,
  CategoryString,
  LikePropsInitialValue,
  CategoryValue,
} from 'constant';
import {
  LikeListDucksProps,
  LikeListProduct,
  LikeList as LikeListProps,
} from 'interfaces/likeList';
import { Product } from 'interfaces/product';
import {
  getLikeListData,
  getLikeListDataVerGridView,
} from 'network/productApi';
import { AxiosResponse } from 'axios';
import { likeListActions } from 'redux/ducks/likeList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Types } from '../../redux/ducks';

const LikeList: FC = () => {
  const [listClicked, setListClicked] = useState<boolean>(true);
  const [gridClicked, setGridClicked] = useState<boolean>(false);
  const [clickedCategory, setClickedCategory] = useState<string>('');
  const [isFetchTrue, setIsFetchTrue] = useState<boolean>(true);
  const [likeDataResponse, setLikeDataResponse] = useState<LikeListProps>(
    LikePropsInitialValue,
  );
  const [likeDataArray, setLikeDataArray] = useState<Product[]>();
  const [gridViewResponse, setGridViewResponse] = useState<
  LikeGridViewProductProps
  >(LikePropsInitialValue);
  const [likeCategories, setLikeCategories] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [firstFetchingTrue, setFirstFetchingTrue] = useState<boolean>(false);
  const [firstCategoryFetchFalse, setFirstCategoryFetchFalse] = useState<
  boolean
  >(true);

  const fetchMoreLikeListData = async (): Promise<void> => {
    await getLikeListData(page)
      .then((response: AxiosResponse<LikeListProduct>) => {
        setLikeDataArray(
          likeDataArray.concat(
            response.data.data[CategoryValue[clickedCategory]],
          ),
        );
        setPage(page + 1);
      })
      .catch(() => setIsFetchTrue(false));
  };

  useEffect(() => {
    const fetchLikeListData = async (): Promise<void> => {
      await getLikeListData(0)
        .then((response: AxiosResponse<LikeListProduct>) => {
          setLikeDataResponse(response.data.data);
          setFirstFetchingTrue(true);
          setIsFetchTrue(true);
          setPage(1);
        })
        .catch((error) => error);
    };
    fetchLikeListData();
  }, [clickedCategory]);

  useEffect(() => {
    const categoryArrayAndGarbage = CategoryString.map(
      (category) => (likeDataResponse[category]?.length > 0 ? category : 0),
    );
    if (firstCategoryFetchFalse) {
      setLikeCategories(
        categoryArrayAndGarbage
          .filter((item) => typeof item === 'string')
          .map((category: string) => category),
      );
    }
  }, [setLikeCategories, likeDataResponse, firstCategoryFetchFalse]);

  useEffect(() => {
    if (Category[likeCategories[0]] !== undefined && firstCategoryFetchFalse) {
      setClickedCategory(Category[likeCategories[0]]);
      setFirstCategoryFetchFalse(false);
    }
  }, [likeCategories, firstCategoryFetchFalse]);

  useEffect(() => {
    setLikeDataArray(likeDataResponse[CategoryValue[clickedCategory]]);
  }, [clickedCategory, likeDataResponse]);

  const handleListClicked = (): void => {
    if (!listClicked && gridClicked) {
      setListClicked(true);
      setGridClicked(false);
    }
  };

  const handleGridClicked = async (): Promise<void> => {
    if (listClicked && !gridClicked) {
      setListClicked(false);
      setGridClicked(true);
      await getLikeListDataVerGridView()
        .then((response: AxiosResponse<FetchGridViewProps>) => {
          setGridViewResponse(response.data.data);
        })
        .catch((error) => error);
    }
  };

  const handleCategoryClick = (event): void => {
    setClickedCategory(event.target.id);
  };

  const handleListItemClick = (event): void => {
    setListClicked(true);
    setGridClicked(false);
    handleCategoryClick(event);
  };

  return (
    <>
      <LikeListHeader />
      <LikeListBar
        listClicked={listClicked}
        gridClicked={gridClicked}
        handleListClicked={handleListClicked}
        handleGridClicked={handleGridClicked}
      />
      {listClicked && (
        <LikeListComponent
          isFetchTrue={isFetchTrue}
          firstFetchingTrue={firstFetchingTrue}
          likeList={likeDataArray}
          handleItemClick={handleCategoryClick}
          clickedCategory={clickedCategory}
          categoryArray={likeCategories}
          fetchApi={fetchMoreLikeListData}
        />
      )}
      {gridClicked && (
        <LikeGridView
          categoryArray={likeCategories}
          itemArray={gridViewResponse}
          handleItemClick={handleListItemClick}
        />
      )}
      <TopButton />
    </>
  );
};

export default connect<LikeListDucksProps, void>(
  (state: Types) => ({
    data: state.likeReducer.data,
    pageId: state.likeReducer.pageId,
    isFetchTrue: state.likeReducer.isFetchTrue,
  }),
  (dispatch) => ({
    fetchLikeProduct: bindActionCreators(
      likeListActions.fetchLikeProduct.request,
      dispatch,
    ),
    setLikeProduct: bindActionCreators(
      likeListActions.setLikeProduct,
      dispatch,
    ),
    setFetchFalse: bindActionCreators(likeListActions.setFetchFalse, dispatch),
  }),
)(LikeList);
