import mongoose, {
  Document, Schema, Model, model,
} from 'mongoose';
import { ICategory } from '../interfaces/category';

export interface ICategoryModel extends ICategory, Document{}

const CategoryValueObject = new Schema({
  categoryName: { type: String, required: true },
  categoryLevel: { type: Number, required: true },
  parentCategoryId: { type: String, default : null },
  wholeCategoryId: { type: String, required: true },
  wholeCategoryName: { type: String, required: true },
});

const categorySchema = new Schema(
  {
    value: {
      type: CategoryValueObject,
      required: true,
    },
  }
);

const Category: Model<ICategoryModel> = model<ICategoryModel>('category', categorySchema, 'Category');

export default Category;
