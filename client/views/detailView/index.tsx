import React, { FC, useEffect, useState } from 'react';
import DetailHeader from 'components/Detail/DetailHeader';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { ProductProps, ProductDataProps } from 'redux/ducks/productInterface';
import { Types } from 'redux/ducks';
import DetailProductInfo from 'components/Detail/DetailProductContent';
import { addCommaStringFromThreeCntNum } from 'utils/stringUtils';

const DetailPage: FC<ProductProps> = (props) => {
  const router = useRouter();
  const { productID } = router.query;
  const { products } = props;
  const [detailData, setDetailData] = useState<ProductDataProps>();

  useEffect(() => {
    if (Array.isArray(productID)) return;
    const productData = products.find(
      (product) => product.productNo.toString() === productID,
    );
    setDetailData(productData);
  }, [products, productID]);

  return (
    <>
      <DetailHeader productName={detailData?.name}/>
      <img
        src={detailData.productImages.url}
        width={detailData.productImages.width}
        height={detailData.productImages.height}
      />
      <DetailProductInfo
        id={detailData.productNo.toString()}
        name={detailData?.name}
        price={addCommaStringFromThreeCntNum(detailData.salePrice)}
        country={detailData?.productInfoProvidedNoticeView.제조국}
        material={detailData?.productInfoProvidedNoticeView.소재}
        color={detailData?.productInfoProvidedNoticeView.색상}
      />
    </>
  );
};


export default connect<ProductProps, void>(
  (state: Types) => ({
    products: state.productReducer.products,
  }),
)(DetailPage);
