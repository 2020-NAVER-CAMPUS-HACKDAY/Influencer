import React, { FC } from 'react';
import MainHeader from 'components/Main/MainHeader';
import { GetServerSideProps } from 'next';
import { CategoryProps } from '../../redux/ducks/category';
import { Category } from '../../interfaces/category';

interface DetailCategoryProps extends CategoryProps {
  categoryData: Category;
  categoryChildrenData: Category[];
}

const DetailCategory: FC<DetailCategoryProps> = (props) => {
  const { categoryData, categoryChildrenData } = props;

  return (
    <MainHeader>
      <div>카테고리 상세 페이지</div>
      <div>{categoryData.value.wholeCategoryName}</div>
      <div>{categoryData.categoryId}</div>
      <div>자식들</div>
      {categoryChildrenData && categoryChildrenData.map((child) => (
        <>
          <div>{child.value.categoryName}</div>
          <div>{child.categoryId}</div>
        </>
      ))}
    </MainHeader>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // TODO(jominjimail): replace hard coding server address with .env parameter
  const res = await fetch(`http://localhost:5000/api/categories/${query.CategoryID}`);
  const { category } = await res.json();
  const res2 = await fetch(`http://localhost:5000/api/categories/children/${query.CategoryID}`);
  const { categories } = await res2.json();

  return {
    props: {
      categoryData: category,
      categoryChildrenData: categories,
    },
  };
};


export default DetailCategory;
