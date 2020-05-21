import { IProduct } from '../interfaces';
import mongoose from 'mongoose';

const Product = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    category: {
      categoryId: { type: String, required: true }
    },
    productNo: { type: Number, required: true },
    name: { type: String, required: [true, 'Please enter a full name'] },

  },
  { timestamps: true, versionKey: false },
);

export default mongoose.model<IProduct & mongoose.Document>('Product', Product, 'ChannelProduct');
