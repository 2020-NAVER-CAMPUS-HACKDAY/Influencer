import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import { Category } from 'interfaces/category';
import MyCategoryView from 'views/myCategoryView';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PayloadActionCreator } from 'typesafe-actions';
import { categoryActions, CategoryProps } from 'redux/ducks/category';
import { Types } from 'redux/ducks';
import { CATEGORY_API, CATEGORY_LEVEL } from 'constant';

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
  // TODO(jominjimail): for easy developing ill change it level=2 later*/}
  const res = await fetch(`${process.env.SERVER_URL}${CATEGORY_API}${CATEGORY_LEVEL}2`);
  // const res = await fetch(`${process.env.SERVER_URL}${CATEGORY_API}`);
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
