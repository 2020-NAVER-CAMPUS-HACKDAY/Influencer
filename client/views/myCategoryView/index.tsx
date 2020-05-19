import React, { useState } from 'react';
import MainHeader from 'components/Main/MainHeader';
import SelectCategory from 'components/SelectCategory';
import { Category } from 'components/SelectCategory/types';
import { CategoryProps, categoryActions } from 'redux/ducks/category';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PayloadActionCreator } from 'typesafe-actions';
import { Types } from '../../redux/ducks';

interface MyCategoryViewProps extends CategoryProps {
  categoryData: Category[];
  setCategory: PayloadActionCreator<'category/SET_CATEGORY', Category | Category[]>;
}

// TODO(jominjimail): data management with redux or hook
const MyCategoryView: React.FC<MyCategoryViewProps> = (props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { categoryData, setCategory } = props;

  const categoryAddHandler = (newCategory: Category): void => {
    setCategories([
      ...categories,
      newCategory,
    ]);
  };

  const categoryDeleteHandler = (id: string): void => {
    // TODO(jominjimail): remove this lint error
    // eslint-disable-next-line no-underscore-dangle
    const newCategories = categories.filter((category) => category._id !== id);
    setCategories(newCategories);
  };

  const setCategoryArray = (): void => {
    setCategory(categories);
  };

  return (
    <MainHeader>
      <SelectCategory
        categoryData={categoryData}
        categoryAddHandler={categoryAddHandler}
        categoryDeleteHandler={categoryDeleteHandler}
      />
      <button onClick={setCategoryArray}>다음 페이지</button>
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
)(MyCategoryView);
