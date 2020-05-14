import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserProps, UserMethods, AuthActions } from 'redux/ducks/auth';
import MainHeader from 'components/MainHeader';
import { myCategoryViewDataArray } from 'views/myCategoryView/myCategoryDummyData';
import SelectCategory from 'components/SelectCategory';

interface Category{
  id: string;
  name: string;
}

interface DefaultProps extends UserProps, UserMethods {
  data: string;
}

const userData = { id: 'dgsda', thumbnail: 'dgsadg' };

const MyCategory: React.FC<DefaultProps> = (props) => {
  const { data, setUser } = props;
  const setUserData = (): void => setUser(userData);
  const [categories, setCategories] = useState<Category[]>([]);
  const dummyData = myCategoryViewDataArray;

  useEffect(() => {
    console.log(categories);
  });

  const categoryAddHandler = (id: string) => {
    console.log(`ADD: ${id}`);
    setCategories([
      ...categories,
      {
        id,
        name: 'newName',
      },
    ]);
  };

  const categoryDeleteHandler = (id: string) => {
    console.log(`DELETE: ${id}`);
    const newCategories = categories.filter((category) => category.id !== id);
    setCategories(newCategories);
  };

  return (
    <MainHeader>
      <div onClick={setUserData}>
        This is my Category setting page.
      </div>
      <SelectCategory
        dummyData = {dummyData}
        categoryAddHandler = {categoryAddHandler}
        categoryDeleteHandler = {categoryDeleteHandler}
      />
    </MainHeader>
  );
};

export default connect<UserProps, void>(
  (state: UserProps) => ({
    user: state.user,
  }),
  (dispatch) => ({
    setUser: bindActionCreators(AuthActions.setUser, dispatch),
  }),
)(MyCategory);
