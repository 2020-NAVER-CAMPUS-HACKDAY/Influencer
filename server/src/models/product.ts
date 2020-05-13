import { IProduct } from '../interfaces';
import mongoose from 'mongoose';

const Product = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    category: { type: Object, required: true },
    name: { type: String, required: [true, 'Please enter a full name'] },

  },
  { timestamps: true }
);

export default mongoose.model<IProduct & mongoose.Document>('Product', Product, 'ChannelProduct');
