import { combineReducers } from 'redux';
import { authReducer, UserProps, UserAction } from './auth';

export const rootReducer = combineReducers({
  authReducer,
});

export interface Types {
  auth: UserProps;
}

export type Actions =
| UserAction