import {
  createReducer,
  ActionType,
  PayloadAction,
  createAction,
} from 'typesafe-actions';
import produce from 'immer';
import { Category, SelectedCategoryDummyData } from 'views/interactionView/interactionDummyData';

const SET_CURRENT_CATEGORY = 'interaction/SET_CURRENT_CATEGORY' as const;
const SET_PAGE = 'interaction/SET_PAGE' as const;

export interface InteractionProps{
  currentCategory: Category;
  page: number;
}

export const interactionActions = {
  setCurrentCategory: createAction(SET_CURRENT_CATEGORY)<Category, number>(),
  setPage: createAction(SET_PAGE)<number>(),
};

export interface InteractionActionsProps {
  setCurrentCategory: PayloadAction<'interaction/SET_CURRENT_CATEGORY', Category>;
  setPage: PayloadAction<'interaction/SET_PAGE', number>;
}

export type InteractionAction =
  | ActionType<typeof interactionActions.setCurrentCategory>
  | ActionType<typeof interactionActions.setPage>;

const initialState = {
  // TODO(seogeurim) 민지님 카테고리와 합치기
  currentCategory: SelectedCategoryDummyData[0],
  page: 1,
};

export const interactionReducer = createReducer(initialState)
  .handleAction(interactionActions.setCurrentCategory,
    (state: InteractionProps, action) => produce(
      state,
      (draft) => {
        draft.currentCategory = action.payload;
        draft.page = 1;
      },
    ))
  .handleAction(interactionActions.setPage, (state) => ({
    currentCategory: state.currentCategory,
    page: state.page + 1,
  }));
