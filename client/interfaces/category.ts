export interface Category {
  categoryId: string;
  value: {
    categoryName: string;
    categoryLevel: number;
    parentCategoryId?: string;
    wholeCategoryId: string;
    wholeCategoryName: string;
  };
}

export interface CategoryDataProps {
    category: Category
}