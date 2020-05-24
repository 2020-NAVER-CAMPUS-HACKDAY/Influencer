interface ProductCategory {
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

interface ProductImage {
  url: string;
  width: number;
  height: number;
}

interface ProductInfoProvidedNoticeView {
  제조국?: string;
  소재?: string;
  색상?: string;
}

export interface Product {
  productNo: number;
  name: string;
  category?: ProductCategory;
  salePrice: number;
  productImages: ProductImage[];
  productInfoProvidedNoticeView?: ProductInfoProvidedNoticeView;
  like: boolean;
}
