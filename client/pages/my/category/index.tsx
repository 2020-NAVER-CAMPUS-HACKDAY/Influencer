import React from 'react';
import { GetStaticProps } from 'next';
import { Category } from 'components/SelectCategory/types';
import MyCategoryView from 'views/myCategoryView';

interface MyCategoryProps {
  categoryData: Category[];
}

const MyCategory: React.FC<MyCategoryProps> = (props) => {
  const { categoryData } = props;

  return (
    <MyCategoryView
      categoryData={categoryData}
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

export default MyCategory;
