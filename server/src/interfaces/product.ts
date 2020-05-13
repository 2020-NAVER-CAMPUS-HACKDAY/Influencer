export interface IProduct {
  _id: string;
  name: string;
  productNo: string;
  category: Object;
}

export interface IProductInputDTO {
  name: string;
}
