import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import { ProductProps } from 'components/Interaction/SwiperItem/interface';
import InteractionPage from 'views/interactionView';

interface InteractionProps {
  productData?: ProductProps[];
  errors?: string;
}

const Interaction: FC<InteractionProps> = ({ productData, errors }) => {
  if (errors) {
    return (
      <InteractionPage categoryId={''} productData={[]} />
    );
  }
  return (
    <InteractionPage categoryId={'50000808'} productData={productData} />
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/products/category/50000808?page=2&limit=10', {
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
    return { props: { productData } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};

export default Interaction;
