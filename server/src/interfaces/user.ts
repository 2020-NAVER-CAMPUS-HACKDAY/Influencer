interface Prefer {
  productNo: string
  categoryId: string;
  rating: number;
  updateDe: Date;
}

export interface IUser {
  _id: string;
  userName: string;
  clothLike: Array<UserLike>,
  accessaryLike: Array<UserLike>,
  beautyLike: Array<UserLike>,
  digitalLike: Array<UserLike>,
  interialLike: Array<UserLike>,
  babyLiike: Array<UserLike>,
  footLike: Array<UserLike>,
  sportLike: Array<UserLike>,
  lifeLike: Array<UserLike>,
  leisureLike: Array<UserLike>,
  dutyFreeLike: Array<UserLike>,
  prefer: Array<Prefer>
}

export interface UserLike {
  id: string;
  image: string;
  modelName: string;
  category: string;
  price: number;
  updateDe: Date;
}