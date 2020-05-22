import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import { Category } from 'interfaces/category';
import MainCategoryView from 'views/mainCategoryView';
import { CATEGORY_API } from 'constant';

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
  // TODO(jominjimail): for easy developing ill change it level=2 later*/}
  const res = await fetch(`${process.env.SERVER_URL}${CATEGORY_API}`);
  const { categories } = await res.json();

  return {
    props: {
      categoryData: categories,
    },
  };
};

export default TempMain;
