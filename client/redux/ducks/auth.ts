import { createAction, createReducer } from 'typesafe-actions';
import { Map } from 'immutable';

const SET_USER = 'auth/SET_USER';

export interface UserProps {
  thumbnail: string;
  id: string;
}
// TODO(daeun): Remove sample code
const setUser = createAction(SET_USER)<UserProps>();

const initialState = Map({
  user: Map({
    thumbnail: '',
    id: '',
  }),
});

// Handle success reducer
export const authReducer = createReducer(initialState)
  .handleAction(setUser, (state, action) => ({ ...state, user: state.set('user', Map(action.payload)) }));
