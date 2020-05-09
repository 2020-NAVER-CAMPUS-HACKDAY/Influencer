import { createAction, createReducer } from 'typesafe-actions';
import produce from 'immer';

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

const initialState = {
  user: {
    id: '',
    thumbnail: '',
  },
};

// Handle success reducer
export const authReducer = createReducer(initialState)
  .handleAction(AuthActions.setUser, (state, action) => produce(state, (draft) => {
    draft.user.id = action.payload.id;
    draft.user.thumbnail = action.payload.thumbnail;
  }));
