import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import { Category } from 'interfaces/category';
import MainCategoryView from 'views/mainCategoryView';

interface MyCategoryProps {
  categoryData: Category[];
}

const TempMain: FC<MyCategoryProps> = (props) => {
  const { categoryData } = props;

  return (
    <MainCategoryView
      categoryData={categoryData}
    >
    </MainCategoryView>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // TODO(jominjimail): replace hard coding server address with .env parameter
  // TODO(jominjimail): for easy developing ill change it level=2 later*/}
  const res = await fetch('http://localhost:5000/api/categories?level=1');
  const { categories } = await res.json();

  return {
    props: {
      categoryData: categories,
    },
  };
};

export default TempMain;
