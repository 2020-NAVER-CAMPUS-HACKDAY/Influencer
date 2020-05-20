export interface IProduct {
  _id: string;
  name: string;
  productNo: string;
  category: Object;
}

export interface IProductInputDTO {
  name: string;
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
