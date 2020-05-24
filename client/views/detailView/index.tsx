import React, { FC, useEffect, useState } from 'react';
import DetailHeader from 'components/Detail/DetailHeader';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { ProductProps, ProductDetailProps, ProductDataProps } from 'redux/ducks/Interface';
import { Types } from 'redux/ducks';
import DetailProductInfo from 'components/Detail/DetailProductContent';
import { addCommaStringFromThreeCntNum } from 'utils/stringUtils';
import { getProductDataForProductId } from 'network/productApi';
import { NOT_FOUND } from 'constant';
import { AxiosResponse } from 'axios';

const DetailView: FC<ProductProps> = (props) => {
  const { products } = props;
  const [detailData, setDetailData] = useState<ProductDataProps>();
  const router = useRouter();
  const { ProductID } = router.query;

  useEffect(() => {
    const searchProductItem = products.find(
      (product) => product.productNo.toString() === ProductID,
    );
    if (searchProductItem === undefined && ProductID !== undefined) {
      const getProductDataForId = async (): Promise<void> => {
        await getProductDataForProductId(ProductID)
          .then(
            (response: AxiosResponse<
            ProductDetailProps
            >) => setDetailData(response.data.product),
          );
      };
      getProductDataForId();
    } else {
      setDetailData(searchProductItem);
    }
  }, [ProductID, products]);

  if (detailData === undefined) return <div>{NOT_FOUND}</div>;

  return (
    <>
      <DetailHeader productName={detailData.name}/>
      <DetailProductInfo
        imageURL={detailData.productImages[0].url}
        imageHeight={detailData.productImages[0].height}
        id={detailData.productNo.toString()}
        name={detailData.name}
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
    selectedProduct: state.productReducer.selectedProduct,
  }),
)(DetailView);
