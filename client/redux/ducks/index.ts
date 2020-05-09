import { combineReducers } from 'redux';
import { authReducer, UserProps } from './auth';

export const rootReducer = combineReducers({
  authReducer,
});

export interface Types {
  auth: UserProps;
}
