// TODO(daeun): modify listProps when connecting with api
export interface LikeListProps {
  productId: string;
  productCompany: string;
  productPrice: number;
  productName: string;
  category: string;
  imageLink: string;
  likeDate: string;
}
export interface LikeListItemProps {
  item: LikeListProps;
}
