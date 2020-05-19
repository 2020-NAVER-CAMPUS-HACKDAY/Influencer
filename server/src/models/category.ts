import mongoose, {
  Document, Schema, Model, model,
} from 'mongoose';
import { ICategory } from '../interfaces/category';

export interface ICategoryModel extends ICategory, Document{}

const categorySchema = new Schema(
  {
    _id: { type: String, required: true },
    value: {
        categoryName: { type: String, required: true },
        categoryLevel: { type: Number, required: true },
        parentCategoryId: { type: String, default : null },
        wholeCategoryId: { type: String, required: true },
        wholeCategoryName: { type: String, required: true },
    },
  }
);

const Category: Model<ICategoryModel> = model<ICategoryModel>('category', categorySchema, 'CategoryLevel');

export default Category;
