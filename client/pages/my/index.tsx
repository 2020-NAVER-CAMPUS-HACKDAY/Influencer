import React, { FC } from 'react';
import MyHeader from 'components/Main/MyHeader';
import { Category } from 'interfaces/category';
import { GetStaticProps } from 'next';
import { CATEGORY_API } from 'constant';
import CategoryHeader from 'components/Category/Header';

interface MyProps {
  categoryData: Category[];
}

const My: FC<MyProps> = (props) => {
  const { categoryData } = props;

  return (
    <>
      <MyHeader/>
      <CategoryHeader categoryData={categoryData}/>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.SERVER_URL}${CATEGORY_API}`);
  const { categories } = await res.json();

  return {
    props: {
      categoryData: categories,
    },
  };
};

export default My;
