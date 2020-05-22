import {
  createAction, createReducer, ActionType, PayloadActionCreator,
} from 'typesafe-actions';
import produce from 'immer';
import { Category } from 'interfaces/category';

const SET_CATEGORY = 'category/SET_CATEGORY' as const;

export interface CategoryProps {
  categoryArray: Category[];
}

export const categoryActions = {
  setCategory: createAction(SET_CATEGORY)<Category[] | Category>(),
};

export interface CategoryActionsProps {
  setCategory: PayloadActionCreator<'category/SET_CATEGORY', Category[] | Category>;
}

export type CategoryAction =
  | ActionType<typeof categoryActions.setCategory>;

const initialState = {
  categoryArray: [],
};

export const categoryReducer = createReducer(initialState)
  .handleAction(categoryActions.setCategory, (state: CategoryProps, action) => produce(
    state,
    (draft) => { draft.categoryArray = action.payload; },
  ));
