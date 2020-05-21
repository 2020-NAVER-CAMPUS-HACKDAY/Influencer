interface ProductImage{
  imageType: string;
  order: number;
  url: string;
  width: number;
  height: number;
}

export interface ProductProps {
  productId: string;
  productName: string;
  productImages: ProductImage;
  salePrice: number;
}

export interface SwiperItemProps {
  productData: ProductProps;
}
