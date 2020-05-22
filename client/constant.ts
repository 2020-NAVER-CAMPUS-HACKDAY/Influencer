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
  FULL_IMAGE: { width: 161, height: 161 },
  VERTICAL_HALF_IMAGE: { width: 80, height: 161 },
  HORIZONTAL_HALF_IMAGE: { width: 161, height: 80 },
  QUARTER_IMAGE: { width: 80, height: 80 },
};


export const Category = {
  50000000: '패션의류',
  50000001: '패션잡화',
  50000002: '화장품/미용',
  50000003: '디지털/가전',
  50000004: '가구/인테리어',
  50000005: '출산/육아',
  50000006: '식품',
  50000007: '스포츠/레저',
  50000008: '생활/건강',
  50000009: '여가/생활편의',
  50000010: '면세점',
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

export const PRODUCT_LIMIT = '200';

export const NOT_FOUND = 404;
