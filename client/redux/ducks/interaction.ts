import {
  createReducer,
  ActionType,
  PayloadAction,
  createAction,
} from 'typesafe-actions';
import produce from 'immer';
import { Category } from 'views/interactionView/interactionDummyData';

const SET_CURRENT_CATEGORY = 'interaction/SET_CURRENT_CATEGORY' as const;
const SET_PAGE = 'interaction/SET_PAGE' as const;

export interface InteractionProps{
  currentCategory: Category;
  page: number;
}

export const interactionActions = {
  currentCategory: createAction(SET_CURRENT_CATEGORY)<Category>(),
  page: createAction(SET_PAGE)<number>(),
};

export interface InteractionActionsProps {
  currentCategory: PayloadAction<'interaction/SET_CURRENT_CATEGORY', Category>;
  page: PayloadAction<'interaction/SET_PAGE', number>;
}

export type InteractionAction =
  | ActionType<typeof interactionActions.currentCategory>
  | ActionType<typeof interactionActions.page>;

const initialState = {
  currentCategory: undefined,
  page: 1,
};

export const interactionReducer = createReducer(initialState)
  .handleAction(interactionActions.currentCategory, (state: InteractionProps, action) => produce(
    state,
    (draft) => {
      draft.currentCategory = action.payload;
      draft.page = 1;
    },
  ))
  .handleAction(interactionActions.page, (state: InteractionProps) => ({
    page: state.page + 1,
  }));
