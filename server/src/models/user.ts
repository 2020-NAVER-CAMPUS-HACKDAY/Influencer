import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    like: {
      type: [],
      required: true
    },
    prefer: [
      {
        product_id: { type: String, required: true },
        categoryId: { type: String, required: true },
        raing: { type: Number, required: true },
        updateDe: { type: Date, default: Date.now() }
      }
    ],
  },
  { timestamps: true }
);

export default mongoose.model<& mongoose.Document>('Product', Product);
