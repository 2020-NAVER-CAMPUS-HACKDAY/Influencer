import React, { FC, useEffect, useState } from 'react';
import DetailHeader from 'components/DetailHeader';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { ProductProps, ProductItemProps } from 'redux/ducks/product';
import { Types } from 'redux/ducks';
import ProcessImage from 'react-imgpro';

const DetailPage: FC<ProductProps> = (props) => {
  const router = useRouter();
  const { productID } = router.query;
  const { productArray } = props;
  const [detailData, setDetailData] = useState<ProductItemProps>();

  useEffect(() => {
    if (Array.isArray(productID)) return;
    const productData = productArray.find((product) => product.id === productID);
    setDetailData(productData);
  }, [productArray, productID]);

  return (
    <>
      <DetailHeader productName={detailData?.name}/>
      <ProcessImage
        image={detailData?.image}
        resize={{ width: 414, height: 414 }}
      />
    </>
  );
};


export default connect<ProductProps, void>(
  (state: Types) => ({
    productArray: state.productReducer.productArray,
  }),
  (dispatch) => ({
  }),
)(DetailPage);
