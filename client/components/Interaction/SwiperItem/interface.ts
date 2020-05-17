interface ProductImage{
  url: string;
  width: number;
  height: number;
}

export interface ProductProps {
  productId: number;
  productName: string;
  productImages: ProductImage;
  salePrice: number;
}

export interface SwiperItemProps {
  productData: ProductProps;
}
