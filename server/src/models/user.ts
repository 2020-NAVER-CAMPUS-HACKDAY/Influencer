import { IUser } from '../interfaces';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    clothLike: {
      type: []
    },
    accessaryLike: {
      type: []
    },
    beautyLike: {
      type: []
    },
    digitalLike: {
      type: []
    },
    interialLike: {
      type: []
    },
    babyLiike: {
      type: []
    },
    footLike: {
      type: []
    },
    sportLike: {
      type: []
    },
    lifeLike: {
      type: []
    },
    leisureLike: {
      type: []
    },
    dutyFreeLike: {
      type: []
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
