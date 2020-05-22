import React, {
  FC, useState, useEffect,
} from 'react';
import LikeListHeader from 'components/LikeList/LikeListHeader';
import LikeListBar from 'components/LikeList/LikeListBar';
import LikeListComponent from 'components/LikeList';
import TopButton from 'components/Common/TopButton';
import { Category, CategoryString, LikePropsInitialValue } from 'constant';
import { LikeListDucksProps, LikeListProductProps, LikeListDataProps } from 'redux/ducks/Interface';
import { getLikeListData } from 'network/productApi';
import { AxiosResponse } from 'axios';
import { likeListActions } from 'redux/ducks/likeList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Types } from '../../redux/ducks';

const LikeList: FC = () => {
  const [listClicked, setListClicked] = useState<boolean>(true);
  const [gridClicked, setGridClicked] = useState<boolean>(false);
  const [clickedCategory, setClickedCategory] = useState<string>();
  const [
    likeDataResponse,
    setLikeDataResponse,
  ] = useState<LikeListDataProps>(LikePropsInitialValue);
  const [likeCategories, setLikeCategories] = useState<string[]>([]);

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

  const handleGridClicked = (): void => {
    if (listClicked && !gridClicked) {
      setListClicked(false);
      setGridClicked(true);
    }
  };

  const handleCategoryClick = (event): void => {
    setClickedCategory(event.target.id);
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
      {
        listClicked && <LikeListComponent
          likeDataResponse={likeDataResponse}
          handleItemClick={handleCategoryClick}
          clickedCategory={clickedCategory}
          categoryArray={likeCategories}
        />
      }
      {/* TODO(daeun): combine component Grid View ver when connecting with GridView API */}
      <TopButton/>
    </>
  );
};

export default connect<LikeListDucksProps, void>(
  (state: Types) => ({
    data: state.likeReducer.data,
    pageId: state.likeReducer.pageId,
  }),
  (dispatch) => ({
    fetchLikeProduct: bindActionCreators(likeListActions.fetchLikeProduct.request, dispatch),
    setPageId: bindActionCreators(likeListActions.setPageId, dispatch),
    setLikeProduct: bindActionCreators(likeListActions.setLikeProduct, dispatch),
  }),
)(LikeList);
