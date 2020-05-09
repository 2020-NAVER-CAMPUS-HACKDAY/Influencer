import { createAction, createReducer } from 'typesafe-actions';
import { Map } from 'immutable';

const SET_USER = 'auth/SET_USER';

export interface UserProps {
  user: Map<string, string>;
}

export interface UserMethods {
  setUser: (user: {id: string; thumbnail: string}) => void;
}

// TODO(daeun): Remove sample code
export const AuthActions = {
  setUser: createAction(SET_USER)<UserProps>(),
};

const initialState = Map({
  user: Map({}),
});

// Handle success reducer
export const authReducer = createReducer(initialState)
  .handleAction(AuthActions.setUser, (state, action) => state.set(
    ['user'],
    action.payload,
  ));
