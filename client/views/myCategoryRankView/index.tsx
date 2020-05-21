import React, { FC } from 'react';
import MainHeader from 'components/Main/MainHeader';
import { CategoryProps, categoryActions } from 'redux/ducks/category';
import { Category } from 'components/SelectCategory/types';
import CategoryRankBox from 'components/CategoryRankBox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Types } from 'redux/ducks';

interface MyCategoryRankProps extends CategoryProps {
  categoryArray: Category[];
}

const MyCategoryRankView: FC<MyCategoryRankProps> = (props) => {
  const { categoryArray } = props;

  return (
    <MainHeader>
      <div>카테고리 랭킹 페이지</div>
      {categoryArray && categoryArray.map((category) => (
        <CategoryRankBox key={category.value.wholeCategoryId} {...{ category }} />
      ))}
    </MainHeader>
  );
};

export default connect<CategoryProps, void>(
  (state: Types) => ({
    categoryArray: state.categoryReducer.categoryArray,
  }),
  (dispatch) => ({
    setCategory: bindActionCreators(categoryActions.setCategory, dispatch),
  }),
)(MyCategoryRankView);
