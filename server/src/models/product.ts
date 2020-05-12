import { IProduct } from '../interfaces/product';
import mongoose from 'mongoose';

const Product = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a full name'],
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct & mongoose.Document>('Product', Product);
