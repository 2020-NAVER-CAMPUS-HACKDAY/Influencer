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
import { ProductProps } from './productInterface';


export const rootReducer = combineReducers({
  authReducer,
  productReducer,
});

export interface Types {
  authReducer: UserProps;
  productReducer: ProductProps;
}

export type Actions =
  | UserAction
  | ProductAction;

export function* rootSaga(): Generator<AllEffect<ForkEffect<object>>> {
  yield all([
    fork(fetchProductSaga),
  ]);
}
