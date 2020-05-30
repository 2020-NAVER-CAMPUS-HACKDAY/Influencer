export interface IProduct {
  _id: string;
  category: Object;
  productNo: Number;
  name: String;
  salePrice: Number;
  productImages: Object;
  productInfoProvidedNoticeView: Object;
}

export interface IProductDTO {
  category: Object;
  productNo: number;
  name: String;
  salePrice: Number;
  productImages: any;
  productInfoProvidedNoticeView: any;
  like?: Boolean;
}

export interface IProductforView {
  productId: string;
  productName: string;
  productImages: Object;
  salePrice: number;
}

export interface FetchProductForGridView extends IProduct {
  modDate: Date;
  productImages: Image[];
  category: Category;
}

export interface ProductVerGridView {
  productId: string;
  imageLink: string;
  category: string;
  likeDate: Date;
}

export interface Image {
  url: string;
  width: string;
  height: string;
}

export interface Category {
  category1Id: string;
}

export interface IProductforView {
  productId: string;
  productName: string;
  productImages: Object;
  salePrice: number;
}
