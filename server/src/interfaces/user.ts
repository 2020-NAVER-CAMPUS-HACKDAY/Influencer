import mongoose from 'mongoose';

export interface IUser {
  [index: string]: Object;
  _id: mongoose.Schema.Types.ObjectId;
  userName: string;
  like: Like;
  prefer: Array<Prefer>
}

interface Prefer {
  productNo: string
  categoryId: string;
  rating: number;
  updateDe: Date;
}

interface Like {
  50000000: {
    categoryName: string,
    likeList: Array<UserLike>
  },
  50000001: {
    categoryName: string,
    likeList: Array<UserLike>
  },
  50000002: {
    categoryName: string,
    likeList: Array<UserLike>
  },
  50000003: {
    categoryName: string,
    likeList: Array<UserLike>
  },
  50000004: {
    categoryName: string,
    likeList: Array<UserLike>
  },
  50000005: {
    categoryName: string,
    likeList: Array<UserLike>
  },
  50000006: {
    categoryName: string,
    likeList: Array<UserLike>
  },
  50000007: {
    categoryName: string,
    likeList: Array<UserLike>
  },
  50000008: {
    categoryName: string,
    likeList: Array<UserLike>
  },
  50000009: {
    categoryName: string,
    likeList: Array<UserLike>
  },
  50000010: {
    categoryName: string,
    likeList: Array<UserLike>
  },
}



export interface UserLike {
  id: string;
  image: string;
  modelName: string;
  category: string;
  price: number;
  updateDe: Date;
}