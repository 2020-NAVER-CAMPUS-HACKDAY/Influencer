import { IProduct } from '../interfaces';
import mongoose from 'mongoose';

const Product = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    category: { type: Object, required: true },
    productNo: { type: Number, required: true },
    name: { type: String, required: [true, 'Please enter a full name'] },
    salePrice: { type: Number, required: true },
    productImages: { type: Object, required: true },
    productInfoProvidedNoticeView: { type: Object, required: true },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model<IProduct & mongoose.Document>(
  'Product',
  Product,
  'ChannelProduct'
);
