import React, {
  FC, useState, useEffect, useCallback, useRef,
} from 'react';
import LikeListHeader from 'components/LikeList/LikeListHeader';
import LikeListBar from 'components/LikeList/LikeListBar';
import LikeListComponent from 'components/LikeList';
import TopButton from 'components/Common/TopButton';
import LikeGridView from 'components/LikeList/LikeGridView';
import { FetchGridViewProps, LikeGridViewProductProps } from 'components/LikeList/LikeGridView/interface';
import { Category, CategoryString, LikePropsInitialValue } from 'constant';
import { LikeListDucksProps, LikeListProductProps, LikeListDataProps } from 'redux/ducks/Interface';
import { getLikeListData, getLikeListDataVerGridView } from 'network/productApi';
import { AxiosResponse } from 'axios';
import { likeListActions } from 'redux/ducks/likeList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import IntersectionObserverList from 'components/Common/IntersectionObserverList';
import { Types } from '../../redux/ducks';

const LikeList: FC = () => {
  const [listClicked, setListClicked] = useState<boolean>(true);
  const [gridClicked, setGridClicked] = useState<boolean>(false);
  const [clickedCategory, setClickedCategory] = useState<string>('');
  const [
    likeDataResponse,
    setLikeDataResponse,
  ] = useState<LikeListDataProps>(LikePropsInitialValue);
  const [
    gridViewResponse,
    setGridViewResponse,
  ] = useState<LikeGridViewProductProps>(LikePropsInitialValue);
  const [likeCategories, setLikeCategories] = useState<string[]>([]);

  const fetchMoreLikeListData = useCallback(async (page): Promise<void> => {
    await getLikeListData(page)
      .then((response: AxiosResponse<LikeListProductProps>) => {
        CategoryString.forEach((category) => {
          if (response.data.data[category].length > 0) {
            setLikeDataResponse(likeDataResponse[category].concat(response.data.data[category]));
          }
        });
      })
      .catch((e) => e);
  }, [likeDataResponse]);

  useEffect(() => {
    const fetchLikeListData = async (): Promise<void> => {
      await getLikeListData(0)
        .then((response: AxiosResponse<LikeListProductProps>) => {
          setLikeDataResponse(response.data.data);
        })
        .catch((error) => error);
    };
    fetchLikeListData();
  }, []);

  useEffect(() => {
    const categoryArrayAndGarbage = CategoryString.map(
      (category) => (likeDataResponse[category]?.length > 0
        ? category
        : 0),
    );
    setLikeCategories(categoryArrayAndGarbage.filter(
      (item) => typeof item === 'string',
    ).map((category: string) => category));
  }, [setLikeCategories, likeDataResponse]);

  useEffect(() => {
    setClickedCategory(Category[likeCategories[0]]);
  }, [likeCategories]);


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
      <IntersectionObserverList fetchApi={fetchMoreLikeListData}>
        <LikeListHeader/>
        <LikeListBar
          listClicked={listClicked}
          gridClicked={gridClicked}
          handleListClicked={handleListClicked}
          handleGridClicked={handleGridClicked}
        />
        {
          listClicked && <LikeListComponent
            likeDataResponse={likeDataResponse}
            handleItemClick={handleCategoryClick}
            clickedCategory={clickedCategory}
            categoryArray={likeCategories}
          />
        }
        {gridClicked && <LikeGridView
          categoryArray={likeCategories}
          itemArray={gridViewResponse}
          handleItemClick={handleListItemClick}
        />
        }
      </IntersectionObserverList>
      <TopButton/>
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
    fetchLikeProduct: bindActionCreators(likeListActions.fetchLikeProduct.request, dispatch),
    setLikeProduct: bindActionCreators(likeListActions.setLikeProduct, dispatch),
    setFetchFalse: bindActionCreators(likeListActions.setFetchFalse, dispatch),
  }),
)(LikeList);
