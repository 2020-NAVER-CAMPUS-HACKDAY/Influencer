import {
  createAction, createReducer, Reducer, ActionType,
} from 'typesafe-actions';
import produce from 'immer';

// TODO(daeun): Remove sample code
const SET_USER = 'auth/SET_USER' as const;

export interface UserProps {
  user: {
    id: string;
    thumbnail: string;
  };
}

export interface UserMethods {
  setUser: (user: {id: string; thumbnail: string}) => void;
}

export const AuthActions = {
  setUser: createAction(SET_USER)<UserProps>(),
};

export type UserAction =
 | ActionType<typeof AuthActions.setUser>;

const initialState = {
  user: {
    id: '',
    thumbnail: '',
  },
};

// Handle success reducer
export const authReducer: Reducer<UserProps, UserAction> = createReducer(initialState)
  .handleAction(AuthActions.setUser, (state: UserProps, action) => produce(state, (draft) => {
    draft.user.id = action.payload.id;
    draft.user.thumbnail = action.payload.thumbnail;
  }));
