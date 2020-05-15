import { combineReducers } from 'redux';
import { authReducer, UserProps, UserAction } from './auth';
import { productReducer, ProductAction, ProductProps } from './product';

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
