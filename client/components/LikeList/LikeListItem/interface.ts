// TODO(daeun): modify listProps when connecting with api
export interface LikeListProps {
  productId: number;
  productCompany: string;
  productPrice: number;
  productName: string;
  category: number;
  imageLink: string;
  likeDate: string;
}
export interface LikeListItemProps {
  item: LikeListProps;
}
