import React, { FC } from 'react';
import MainHeader from 'components/Main/MainHeader';
import { GetServerSideProps } from 'next';
import { CategoryProps } from '../../redux/ducks/category';
import { Category } from '../../interfaces/category';

interface DetailCategoryProps extends CategoryProps {
  categoryData: Category;
}

const DetailCategory: FC<DetailCategoryProps> = (props) => {
  const { categoryData } = props;

  return (
    <MainHeader>
      <div>카테고리 상세 페이지</div>
      <div>{categoryData.categoryId}</div>
    </MainHeader>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const res = await fetch(`http://localhost:5000/api/categories/${query.CategoryID}`);
  const { category } = await res.json();

  return {
    props: {
      categoryData: category,
    },
  };
};


export default DetailCategory;
