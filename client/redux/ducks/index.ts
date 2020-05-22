import { combineReducers } from 'redux';
import {
  fork, all, ForkEffect, AllEffect,
} from 'redux-saga/effects';
import {
  productReducer,
  ProductAction,
  fetchProductSaga,
} from 'redux/ducks/product';
import { fetchLikeProductDataSaga, LikeListAction, likeReducer } from 'redux/ducks/likeList';
import { authReducer, UserProps, UserAction } from './auth';
import { categoryReducer, CategoryAction, CategoryProps } from './category';
import { ProductProps, LikeListDucksProps } from './Interface';

export const rootReducer = combineReducers({
  authReducer,
  productReducer,
  categoryReducer,
  likeReducer,
});

export interface Types {
  authReducer: UserProps;
  productReducer: ProductProps;
  categoryReducer: CategoryProps;
  likeReducer: LikeListDucksProps;
}

export type Actions =
  | UserAction
  | ProductAction
  | CategoryAction
  | LikeListAction;

export function* rootSaga(): Generator<AllEffect<ForkEffect<object>>> {
  yield all([
    fork(fetchProductSaga),
    fork(fetchLikeProductDataSaga),
  ]);
}
