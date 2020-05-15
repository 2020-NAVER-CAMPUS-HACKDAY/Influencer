import React, { FC, useEffect, useState } from 'react';
import DetailHeader from 'components/Detail/DetailHeader';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { ProductProps, ProductItemProps } from 'redux/ducks/product';
import { Types } from 'redux/ducks';
import DetailProductInfo from 'components/Detail/DetailProductContent';
import { addCommaStringFromThreeCntNum } from 'utils/stringUtils';

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
      <img
        src={detailData?.image}
        width={414}
        height={414}
      />
      <DetailProductInfo
        id={detailData?.id}
        name={detailData?.name}
        price={addCommaStringFromThreeCntNum(detailData?.price)}
        modelName={detailData?.modelName}
        makeCompany={detailData?.makeCompany}
        brand={detailData?.brand}
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
