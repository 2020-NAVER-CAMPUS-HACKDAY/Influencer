export interface ICategory {
  value: ICategoryValueObject;
}

export interface ICategoryValueObject {
  categoryName: String;
  categoryLevel: Number;
  parentCategoryId?: String;
  wholeCategoryId: String;
  wholeCategoryName: String;
  lastLevel: Boolean;
};
