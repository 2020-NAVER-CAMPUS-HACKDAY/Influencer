import { combineReducers } from 'redux';
import {
  fork, all, ForkEffect, AllEffect,
} from 'redux-saga/effects';
import {
  productReducer,
  ProductAction,
  fetchProductSaga,
} from 'redux/ducks/product';
import { authReducer, UserProps, UserAction } from './auth';
import { productReducer, ProductAction, ProductProps } from './product';
import { categoryReducer, CategoryAction, CategoryProps } from './category';
import { ProductProps } from './productInterface';

export const rootReducer = combineReducers({
  authReducer,
  productReducer,
  categoryReducer,
});

export interface Types {
  authReducer: UserProps;
  productReducer: ProductProps;
  categoryReducer: CategoryProps;
}

export type Actions =
  | UserAction
  | ProductAction
  | CategoryAction;

export function* rootSaga(): Generator<AllEffect<ForkEffect<object>>> {
  yield all([
    fork(fetchProductSaga),
  ]);
}
