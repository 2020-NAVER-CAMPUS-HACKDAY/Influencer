import { combineReducers } from 'redux';
import {
  fork, all, ForkEffect, AllEffect,
} from 'redux-saga/effects';
import {
  productReducer,
  ProductAction,
  fetchProductSaga,
} from 'redux/ducks/product';
import { interactionReducer, InteractionAction, InteractionProps } from 'redux/ducks/interaction';
import { authReducer, UserProps, UserAction } from './auth';
import { categoryReducer, CategoryAction, CategoryProps } from './category';
import { ProductProps } from './productInterface';

export const rootReducer = combineReducers({
  authReducer,
  productReducer,
  categoryReducer,
  interactionReducer,
});

export interface Types {
  authReducer: UserProps;
  productReducer: ProductProps;
  categoryReducer: CategoryProps;
  interactionReducer: InteractionProps;
}

export type Actions =
  | UserAction
  | ProductAction
  | CategoryAction
  | InteractionAction;

export function* rootSaga(): Generator<AllEffect<ForkEffect<object>>> {
  yield all([
    fork(fetchProductSaga),
  ]);
}
