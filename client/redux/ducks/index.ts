import { combineReducers } from 'redux';
import {
  fork, all, ForkEffect, AllEffect,
} from 'redux-saga/effects';
import {
  productReducer,
  ProductAction,
  ProductProps,
  fetchProductSaga,
} from 'redux/ducks/product';
import { fetchLikeProductDataSaga, LikeListAction, likeReducer } from 'redux/ducks/likeList';
import { authReducer, UserProps, UserAction } from './auth';
import { categoryReducer, CategoryAction, CategoryProps } from './category';
import { ProductProps, LikeListDucksProps } from './Interface';
import { interactionReducer, InteractionAction, InteractionProps } from 'redux/ducks/interaction';

export const rootReducer = combineReducers({
  authReducer,
  productReducer,
  categoryReducer,
  likeReducer,
  interactionReducer,
});

export interface Types {
  authReducer: UserProps;
  productReducer: ProductProps;
  categoryReducer: CategoryProps;
  likeReducer: LikeListDucksProps;
  interactionReducer: InteractionProps;
}

export type Actions =
  | UserAction
  | ProductAction
  | CategoryAction
  | LikeListAction
  | InteractionAction;

export function* rootSaga(): Generator<AllEffect<ForkEffect<object>>> {
  yield all([
    fork(fetchProductSaga),
    fork(fetchLikeProductDataSaga),
  ]);
}
