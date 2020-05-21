export interface ProductDataProps {
  productNo: number;
  name: string;
  category: CategoryProps;
  salePrice: number;
  productImages: ProductImageProps[];
  productInfoProvidedNoticeView: ProductInfoProvidedNoticeViewProps;
}

export interface ProductDetailProps {
  product: ProductDataProps;
}

interface CategoryProps {
  categoryId: string;
  categoryName: string;
  category1Id: string;
  category2Id: string;
  category3Id: string;
  category1Name: string;
  category2Name: string;
  category3Name: string;
  wholeCategoryId: string;
  wholeCategoryName: string;
  categoryLevel: string;
}

export interface ProductImageProps {
  url: string;
  width: number;
  height: number;
}

export interface ProductInfoProvidedNoticeViewProps {
  제조국?: string;
  소재?: string;
  색상?: string;
}

export interface ProductProps {
  products: ProductDataProps[];
  selectedProduct: ProductDataProps;
}

export interface LikeListDataProps {
  clothLike: ProductDataProps[];
  accessaryLike: ProductDataProps[];
  beautyLike: ProductDataProps[];
  digitalLike: ProductDataProps[];
  interialLike: ProductDataProps[];
  babyLike: ProductDataProps[];
  footLike: ProductDataProps[];
  sportLike: ProductDataProps[];
  lifeLike: ProductDataProps[];
  leisureLike: ProductDataProps[];
  dutyFreeLike: ProductDataProps[];
}
