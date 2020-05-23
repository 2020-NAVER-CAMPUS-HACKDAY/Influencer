import { combineReducers } from 'redux';
import {
  fork, all, ForkEffect, AllEffect,
} from 'redux-saga/effects';
import {
  productReducer,
  ProductAction,
  fetchProductSaga,
} from 'redux/ducks/product';
import {
  interactionReducer, InteractionAction, InteractionProps,
} from 'redux/ducks/interaction';
import { authReducer, UserProps, UserAction } from 'redux/ducks/auth';
import { categoryReducer, CategoryAction, CategoryProps } from 'redux/ducks/category';
import {
  fetchLikeProductDataSaga, LikeListAction, likeReducer,
} from 'redux/ducks/likeList';
import {
  ProductProps, LikeListDucksProps,
} from './Interface';


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
