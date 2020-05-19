import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import { ProductProps } from 'components/Interaction/SwiperItem/interface';
import InteractionPage from 'views/interactionView';
import { Category, SelectedCategoryDummyData } from 'views/interactionView/interactionDummyData';

interface InteractionProps {
  categoryData: Category[];
  productData?: ProductProps[];
  errors?: string;
}

const Interaction: FC<InteractionProps> = (props) => {
  const { categoryData, productData, errors } = props;
  if (errors) {
    return (
      <InteractionPage categoryData={[]} productData={[]} />
    );
  }
  return (
    <InteractionPage categoryData={categoryData} productData={productData} />
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const categoryData = SelectedCategoryDummyData;
  try {
    const response = await fetch(`http://localhost:5000/api/products/category/${categoryData[0].id}?page=1&limit=10`, {
      method: 'GET',
    });
    const result = await response.json();
    const productData = await result.products.map(({
      _id, name, salePrice, productImages,
    }) => ({
      productId: _id,
      productName: name,
      productImages: productImages[0],
      salePrice: Number(salePrice.$numberDecimal),
    }));
    return { props: { categoryData, productData } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};

export default Interaction;
