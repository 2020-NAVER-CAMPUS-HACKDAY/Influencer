export interface Category {
  _id: string;
  value: {
    categoryName: string;
    categoryLevel: number;
    parentCategoryId?: string;
    wholeCategoryId: string;
    wholeCategoryName: string;
  };
}
