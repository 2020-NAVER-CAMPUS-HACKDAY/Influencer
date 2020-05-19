import { combineReducers } from 'redux';
import { authReducer, UserProps, UserAction } from './auth';
import { productReducer, ProductAction, ProductProps } from './product';
import { categoryReducer, CategoryAction, CategoryProps } from './category';

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
