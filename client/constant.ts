import { GridViewImageSize } from 'components/LikeList/LikeGridView/interface';

export const AppColor = {
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  GREEN: '#01C73B',
  PURPLE: '#827EDB',
  RED: '#ff1616',
  BLUE: '#0012c4',
  LIGHT_BLUE: '#6877E1',
  MAIN_HEADER: 'linear-gradient(to right, #01C73B, #827EDB)',
  DETAIL_HEADER: '#8452C7',
  BLACK20: 'rgba(0, 0, 0, 0.2)',
  BLACK70: 'rgba(0, 0, 0, 0.7)',
  BLACK50: 'rgba(0, 0, 0, 0.5)',
  GREY: '#E9ECEF',
  DARK_GREY: '#C4C4C4',
};

export const CONSTANT_TAG = 24;

export const GridImageSize: GridViewImageSize = {
  FULL_IMAGE: { width: 161, height: 161 },
  VERTICAL_HALF_IMAGE: { width: 80, height: 161 },
  HORIZONTAL_HALF_IMAGE: { width: 161, height: 80 },
  QUARTER_IMAGE: { width: 80, height: 80 },
};

export const CategoryValue = {
  패션의류: 'clothLike',
  패션잡화: 'accessaryLike',
  '화장품/미용': 'beautyLike',
  '디지털/가전': 'digitalLike',
  '가구/인테리어': 'interialLike',
  '출산/육아': 'babyLike',
  식품: 'footLike',
  '스포츠/레저': 'sportLike',
  '생활/건강': 'lifeLike',
  '여가/생활편의': 'leisureLike',
  면세점: 'dutyFreeLike',
};

export const Category = {
  clothLike: '패션의류',
  accessaryLike: '패션잡화',
  beautyLike: '화장품/미용',
  digitalLike: '디지털/가전',
  interialLike: '가구/인테리어',
  babyLike: '출산/육아',
  footLike: '식품',
  sportLike: '스포츠/레저',
  lifeLike: '생활/건강',
  leisureLike: '여가/생활편의',
  dutyFreeLike: '면세점',
};

export const SwipeAction = {
  DEFAULT: '',
  LIKE: '좋아요',
  UNLIKE: '싫어요',
};

export const TITLE_ADD = '&title=';

export const SHARE_TITLE = '상품';

export const PRODUCT_PAGE_API = 'products/';
export const PRODUCT_CATEGORY = 'category/';
export const PAGE_ADD = '?page=';
export const LIMIT_ADD = '&limit=';

export const CATEGORY_API = 'categories/';
export const CATEGORY_CHILDREN_API = 'children/';
export const CATEGORY_LEVEL = '?level=';

export const USER_API = 'users/';
export const USER_PREFER_API = 'prefer/';

export const PRODUCT_LIMIT = '30';

export const NOT_FOUND = 404;

export const LIKE_LIST_API = 'users/likes/';
export const GRID_VIEW = 'grid-view';
export const CategoryString = [
  'clothLike',
  'accessaryLike',
  'beautyLike',
  'digitalLike',
  'interialLike',
  'babyLike',
  'footLike',
  'sportLike',
  'lifeLike',
  'leisureLike',
  'dutyFreeLike',
];

export const LikePropsInitialValue = {
  accessaryLike: [],
  sportLike: [],
  leisureLike: [],
  clothLike: [],
  beautyLike: [],
  digitalLike: [],
  interialLike: [],
  babyLike: [],
  footLike: [],
  lifeLike: [],
  dutyFreeLike: [],
};

export const PublicImageCategoryPath = '/images/category/';

// TODO(jominjimail): replace this array with enum type
export const ImageArray = [
  'icon_all_108x108',
  'icon_distilled_108x108',
  'icon_etc_108x108',
  'icon_fruit_liquor_108x108',
  'icon_gift_set_108x108',
  'icon_liqueur_108x108',
  'icon_raspberry_108x108',
  'icon_soju_108x108',
  'icon_takju_108x108',
  'icon_wine_108x108',
  'icon_yakju_108x108',
];

export const ImageExtension = {
  PNG: '.png',
};
