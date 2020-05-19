import { IUser } from '../interfaces';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    like: {
      50000000: {
        categoryName: { type: String, default: 'clothLike' },
        likeList: { type: Array }
      },
      50000001: {
        categoryName: { type: String, default: 'accessaryLike' },
        likeList: { type: Array }
      },
      50000002: {
        categoryName: { type: String, default: 'beautyLike' },
        likeList: { type: Array }
      },
      50000003: {
        categoryName: { type: String, default: 'digitalLike' },
        likeList: { type: Array }
      },
      50000004: {
        categoryName: { type: String, default: 'interialLike' },
        likeList: { type: Array }
      },
      50000005: {
        categoryName: { type: String, default: 'babyLiike' },
        likeList: { type: Array }
      },
      50000006: {
        categoryName: { type: String, default: 'footLike' },
        likeList: { type: Array }
      },
      50000007: {
        categoryName: { type: String, default: 'sportLike' },
        likeList: { type: Array }
      },
      50000008: {
        categoryName: { type: String, default: 'lifeLike' },
        likeList: { type: Array }
      },
      50000009: {
        categoryName: { type: String, default: 'leisureLike' },
        likeList: { type: Array }
      },
      50000010: {
        categoryName: { type: String, default: 'dutyFreeLike' },
        likeList: { type: Array }
      },
    },
    prefer: [
      {
        productNo: { type: Number, required: true },
        categoryId: { type: String, required: true },
        rating: { type: Number, required: true },
        updateDe: { type: Date, default: Date.now() }
      }
    ]
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model<IUser & mongoose.Document>('User', User, 'User');
