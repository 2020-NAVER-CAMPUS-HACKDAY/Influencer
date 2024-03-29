export interface Category {
  categoryId: string;
  value: {
    categoryName: string;
    categoryLevel: number;
    parentCategoryId?: string;
    wholeCategoryId: string;
    wholeCategoryName: string;
    lastLevel: boolean;
  };
}

export interface CategoryDataProps {
  category: Category;
}

export interface CategoryChildrenProps {
  categories: Category[];
}
