import mongoose from 'mongoose';

export interface IUser {
  [index: string]: Object;
  _id: mongoose.Schema.Types.ObjectId;
  userName: string;
  like: Like;
  prefer: Array<Prefer>;
}

export interface Prefer {
  productNo: string;
  categoryId: string;
  rating: number;
  updateDe: Date;
}

export interface RecommenderResult {
  id: string;
  score: number;
}

export interface CategoryLike {
  categoryName: string;
  likeList: number[];
}

interface Like {
  50000000: CategoryLike;
  50000001: CategoryLike;
  50000002: CategoryLike;
  50000003: CategoryLike;
  50000004: CategoryLike;
  50000005: CategoryLike;
  50000006: CategoryLike;
  50000007: CategoryLike;
  50000008: CategoryLike;
  50000009: CategoryLike;
  50000010: CategoryLike;
}

export interface UserLike {
  id: string;
  image: string;
  modelName: string;
  category: string;
  price: number;
  updateDe: Date;
}

export interface UserLikeListVerGrid {
  id: string;
  image: string;
  category: string;
  updateDate: Date;
}
