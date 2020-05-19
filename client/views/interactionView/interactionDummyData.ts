// TODO(seogeurim) Category Interface는 민지님께서 작성해주신 것과 연결할 예정
// TODO(seogeurim) 민지님과 상의하여 categoryData의 _id => id로
export interface Category{
  id: string;
  value: {
    categoryName: string;
    categoryLevel: number;
    parentCategoryId?: string;
    wholeCategoryId: string;
    wholeCategoryName: string;
  };
}

export const SelectedCategoryDummyData: Category[] = [
  {
    id: '50000808',
    value: {
      categoryName: '스커트',
      categoryLevel: 3,
      parentCategoryId: '50000167',
      wholeCategoryId: '50000000>50000167>50000808',
      wholeCategoryName: '패션의류>여성의류>스커트',
    },
  },
  {
    id: '50000815',
    value: {
      categoryName: '재킷',
      categoryLevel: 3,
      parentCategoryId: '50000167',
      wholeCategoryId: '50000000>50000167>50000815',
      wholeCategoryName: '패션의류>여성의류>재킷',
    },
  },
  {
    id: '50000806',
    value: {
      categoryName: '카디건',
      categoryLevel: 3,
      parentCategoryId: '50000167',
      wholeCategoryId: '50000000>50000167>50000806',
      wholeCategoryName: '패션의류>여성의류>카디건',
    },
  },
];

