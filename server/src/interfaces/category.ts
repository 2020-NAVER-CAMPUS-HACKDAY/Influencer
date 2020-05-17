export interface ICategory {
  value: ICategoryValueObject;
}

export interface ICategoryValueObject {
  categoryName: string,
  categoryLevel: number,
  parentCategoryId?: string,
  wholeCategoryId: string,
  wholeCategoryName: string,
};
