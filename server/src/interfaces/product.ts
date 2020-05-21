export interface IProduct {
  _id: string;
  category: Object;
  productNo: String;
  name: String;
  salePrice: Number;
  productImages: Object;
  productInfoProvidedNoticeView: Object;
}

export interface IProductDTO {
  category: Object;
  productNo: String;
  name: String;
  salePrice: Number;
  productImages: Object;
  productInfoProvidedNoticeView: Object;
}

export interface IProductforView {
  productId: string;
  productName: string;
  productImages: Object;
  salePrice: number;
}
