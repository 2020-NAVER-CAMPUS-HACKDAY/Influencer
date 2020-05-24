import React, { FC } from 'react';
import MainHeader from 'components/Main/MainHeader';
import { GetServerSideProps } from 'next';
import { CategoryProps } from 'redux/ducks/category';
import { Category } from 'interfaces/category';
import { CATEGORY_API, CATEGORY_CHILDREN_API } from 'constant';
import Router from 'next/router';
import ChildrenCard from 'components/CategoryHeader/ChildrenCard';
import WholeCategoryName from 'components/CategoryHeader/WholeCategoryName';

interface DetailCategoryProps extends CategoryProps {
  categoryData: Category;
  categoryChildrenData: Category[];
}

const DetailCategory: FC<DetailCategoryProps> = (props) => {
  const { categoryData, categoryChildrenData } = props;

  const setCategory = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const categoryId: string = event.currentTarget.value;
    Router.push(`/tempCategoryDetail/${categoryId}`);
  };

  return (
    <MainHeader>
      <div>카테고리 상세 페이지</div>
      <WholeCategoryName
        names={categoryData.value.wholeCategoryName}
        ids={categoryData.value.wholeCategoryId}
      >
      </WholeCategoryName>
      <ChildrenCard childreanData={categoryChildrenData}></ChildrenCard>
    </MainHeader>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const baseUrl = process.env.SERVER_URL;
  const getCategoryInfoUrl = baseUrl + CATEGORY_API + query.CategoryID;
  const getCategoryChildrenUrl = baseUrl + CATEGORY_API + CATEGORY_CHILDREN_API + query.CategoryID;

  const res = await fetch(getCategoryInfoUrl);
  const { category } = await res.json();
  const res2 = await fetch(getCategoryChildrenUrl);
  const { categories } = await res2.json();

  return {
    props: {
      categoryData: category,
      categoryChildrenData: categories,
    },
  };
};


export default DetailCategory;
