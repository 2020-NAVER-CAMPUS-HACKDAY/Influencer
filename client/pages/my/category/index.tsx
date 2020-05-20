import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import { Category } from 'components/SelectCategory/types';
import MyCategoryView from 'views/myCategoryView';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PayloadActionCreator } from 'typesafe-actions';
import { categoryActions, CategoryProps } from '../../../redux/ducks/category';
import { Types } from '../../../redux/ducks';

interface MyCategoryProps extends CategoryProps {
  categoryData: Category[];
  categoryArray: Category[];
  setCategory: PayloadActionCreator<'category/SET_CATEGORY', Category | Category[]>;
}

const MyCategory: FC<MyCategoryProps> = (props) => {
  const { categoryData, categoryArray, setCategory } = props;

  return (
    <MyCategoryView
      categoryData={categoryData}
      categoryArray={categoryArray}
      setCategory={setCategory}
    >
    </MyCategoryView>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // TODO(jominjimail): replace hard coding server address with .env parameter
  const res = await fetch('http://localhost:5000/api/categories?level=2');
  const { categories } = await res.json();

  return {
    props: {
      categoryData: categories,
    },
  };
};

export default connect<CategoryProps, void>(
  (state: Types) => ({
    categoryArray: state.categoryReducer.categoryArray,
  }),
  (dispatch) => ({
    setCategory: bindActionCreators(categoryActions.setCategory, dispatch),
  }),
)(MyCategory);
