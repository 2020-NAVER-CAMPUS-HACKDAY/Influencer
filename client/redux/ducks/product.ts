import {
  createAction, createReducer, ActionType, PayloadActionCreator,
} from 'typesafe-actions';
import produce from 'immer';

const ADD_PRODUCT = 'product/ADD_PRODUCT' as const;

// TODO(anyone): add some props when connecting API
export interface ProductItemProps {
  id: string;
  brand: string;
  name: string;
  image: string;
  makeCompany: string;
  modelName: string;
  category: number;
  price: number;
}

export interface ProductProps {
  productArray: ProductItemProps[];
}

export const productActions = {
  addProduct: createAction(ADD_PRODUCT)<ProductItemProps[] | ProductItemProps>(),
};

export interface ProductActionsProps {
  addProduct: PayloadActionCreator<'product/ADD_PRODUCT', ProductItemProps[] | ProductItemProps>;
}

export type ProductAction =
  | ActionType<typeof productActions.addProduct>;

const initialState = {
  productArray: [],
};

export const productReducer = createReducer(initialState)
  .handleAction(productActions.addProduct, (state: ProductProps, action) => produce(
    state,
    (draft) => { action.payload.map((data) => draft.productArray.push(data)); },
  ));
