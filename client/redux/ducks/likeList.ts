import {
  createReducer,
  ActionType,
  PayloadActionCreator,
  createAsyncAction,
  createAction,
  PayloadAction,
} from 'typesafe-actions';
import produce from 'immer';
import * as ProductAPI from 'network/productApi';
import {
  call, CallEffect, ForkEffect, put, PutEffect, takeEvery,
} from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { CategoryString } from 'constant';
import { LikeListProductProps, LikeListDucksProps } from 'redux/ducks/Interface';

const FETCH_LIKE_PRODUCT_REQUEST = 'likeList/FETCH_LIKE_PRODUCT_REQUEST' as const;
const FETCH_LIKE_PRODUCT_SUCCESS = 'likeList/FETCH_LIKE_PRODUCT_SUCCESS' as const;
const FETCH_LIKE_PRODUCT = 'likeList/FETCH_LIKE_PRODUCT_FAIL' as const;
const SET_LIKE_PRODUCT = 'likeList/SET_LIKE_PRODUCT' as const;
const SET_PAGE_ID = 'likeList/SET_PAGE_ID' as const;

export const likeListActions = {
  fetchLikeProduct: createAsyncAction(
    FETCH_LIKE_PRODUCT_REQUEST,
    FETCH_LIKE_PRODUCT_SUCCESS,
    FETCH_LIKE_PRODUCT,
  )<number, LikeListProductProps[] | unknown, Error>(),
  setLikeProduct: createAction(SET_LIKE_PRODUCT)<LikeListProductProps>(),
  setPageId: createAction(SET_PAGE_ID)<number>(),
};

export interface LikeListActionsProps {
  fetchLikeProduct: PayloadActionCreator<'likeList/FETCH_LIKE_PRODUCT_REQUEST', number>;
  setLikeProduct: PayloadActionCreator<'likeList/SET_LIKE_PRODUCT', LikeListProductProps>;
  setPageId: PayloadActionCreator<'likeList/SET_PAGE_ID', number>;
}

export type LikeListAction =
  | ActionType<typeof likeListActions.fetchLikeProduct>
  | ActionType<typeof likeListActions.setLikeProduct>
  | ActionType<typeof likeListActions.setPageId>;

const initialState = {
  data: {},
  pageId: 0,
};

export function* fetchLikeProductData(action): Generator<
(
  PutEffect<PayloadAction<'likeList/FETCH_LIKE_PRODUCT_SUCCESS', LikeListProductProps | unknown>>
  | PutEffect<PayloadAction<'likeList/FETCH_LIKE_PRODUCT_FAIL', Error>>
  | CallEffect<AxiosResponse<LikeListProductProps | Error>>
)
> {
  try {
    const likeProductData: LikeListProductProps | unknown = yield call(
      ProductAPI.getLikeListData,
      action.payload,
    );
    yield put(likeListActions.fetchLikeProduct.success(likeProductData));
  } catch (e) {
    yield put(likeListActions.fetchLikeProduct.failure(e));
  }
}

export function* fetchLikeProductDataSaga(): Generator<ForkEffect<never>> {
  yield takeEvery(likeListActions.fetchLikeProduct.request, fetchLikeProductData);
}

export const likeReducer = createReducer(initialState)
  .handleAction(likeListActions.fetchLikeProduct.success,
    (state: LikeListDucksProps, action) => produce(
      state,
      (draft) => {
        CategoryString.forEach(
          (category) => {
            draft.data[category] = action.payload.data.data[category];
          },
        );
      },
    ))
  .handleAction(likeListActions.setLikeProduct,
    (state: LikeListDucksProps, action) => produce(
      state,
      (draft) => {
        CategoryString.forEach(
          (category) => {
            draft.data[category] = action.payload[category];
          },
        );
      },
    ))
  .handleAction(likeListActions.setPageId,
    (state: LikeListDucksProps, action) => produce(
      state,
      (draft) => {
        draft.pageId = action.payload;
      },
    ));
