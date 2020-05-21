export interface IProduct {
  _id: string;
  category: Object;
  productNo: Number;
  name: String;
  salePrice: Number;
  productImages: Object;
  productInfoProvidedNoticeView: Object;
}

export interface IProductInputDTO {
  name: string;
}

export interface IProductforView {
  productId: string;
  productName: string;
  productImages: Object;
  salePrice: number;
}