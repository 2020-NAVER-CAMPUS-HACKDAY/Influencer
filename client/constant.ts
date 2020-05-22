import { GridViewImageSize } from 'components/LikeList/LikeGridView/interface';

export const AppColor = {
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  GREEN: '#01C73B',
  PURPLE: '#827EDB',
  RED: '#ff1616',
  BLUE: '#0012c4',
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
  FULL_IMAGE: { width: 155, height: 155 },
  VERTICAL_HALF_IMAGE: { width: 77, height: 155 },
  HORIZONTAL_HALF_IMAGE: { width: 155, height: 77 },
  QUARTER_IMAGE: { width: 77, height: 77 },
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

export const PRODUCT_PAGE_API = '/api/products/';
export const PAGE_ADD = '?page=';
export const LIMIT_ADD = '&limit=';

export const PRODUCT_LIMIT = '200';

export const NOT_FOUND = 404;

export const LIKE_LIST_API = '/api/users/likes/';
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
