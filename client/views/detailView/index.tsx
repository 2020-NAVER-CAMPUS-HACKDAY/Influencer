import React from 'react';
import DetailHeader from 'components/DetailHeader';

// TODO(daeun): modify props when connecting with store
interface DetailPageProps {
  category: string;
  image: string[];
  productName: string;
  productCompany: string;
}

const DetailPage: React.FC<DetailPageProps> = (props) => {
  const { productName } = props;

  return (
    <DetailHeader productName={productName}/>
  );
};

export default DetailPage;
