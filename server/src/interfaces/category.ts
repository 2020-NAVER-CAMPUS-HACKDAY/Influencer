export interface ICategory {
  value: ICategoryValueObject;
}

export interface ICategoryValueObject {
  categoryName: string,
  categoryLevel: number,
  parentCategoryId: string | null,
  wholeCategoryId: string,
  wholeCategoryName: string,
};
