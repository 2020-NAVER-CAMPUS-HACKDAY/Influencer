import {
  createReducer,
  ActionType,
  PayloadActionCreator,
  createAsyncAction,
  PayloadAction,
  createAction,
} from 'typesafe-actions';
import produce from 'immer';
import * as ProductAPI from 'network/productApi';
import {
  call, CallEffect, ForkEffect, put, PutEffect, takeEvery,
} from 'redux-saga/effects';
import { cloneDeep } from 'lodash';
import { AxiosResponse } from 'axios';
import { ProductDataProps, ProductProps } from './Interface';

const FETCH_AND_ADD_PRODUCT_REQUEST = 'product/FETCH_AND_ADD_PRODUCT_REQUEST' as const;
const FETCH_AND_ADD_PRODUCT_SUCCESS = 'product/FETCH_AND_ADD_PRODUCT_SUCCESS' as const;
const FETCH_AND_ADD_PRODUCT_FAIL = 'product/FETCH_AND_ADD_PRODUCT_FAIL' as const;
const GET_PRODUCT_FOR_ID = 'product/GET_PRODUCT_FOR_ID' as const;

export interface ProductProps {
  products: Product[];
  selectedProduct: Product;
}

export const productActions = {
  fetchAndAddProduct: createAsyncAction(
    FETCH_AND_ADD_PRODUCT_REQUEST,
    FETCH_AND_ADD_PRODUCT_SUCCESS,
    FETCH_AND_ADD_PRODUCT_FAIL,
  )<number, Product[] | unknown, Error>(),
  getProductForId: createAction(GET_PRODUCT_FOR_ID)<number>(),
};

export interface ProductActionsProps {
  fetchAndAddProduct: PayloadActionCreator<'product/FETCH_AND_ADD_PRODUCT_REQUEST', number>;
  getProductForId: PayloadActionCreator<'product/GET_PRODUCT_FOR_ID', number>;
}

export type ProductAction =
  | ActionType<typeof productActions.fetchAndAddProduct>
  | ActionType<typeof productActions.getProductForId>;

const initialState = {
  products: [],
};

export function* fetchAndAddProduct(action): Generator<
(
  PutEffect<PayloadAction<'product/FETCH_AND_ADD_PRODUCT_SUCCESS', Product[] | unknown>>
  | PutEffect<PayloadAction<'product/FETCH_AND_ADD_PRODUCT_FAIL', Error>>
  | CallEffect<AxiosResponse<Product[] | Error>>
)
> {
  try {
    const productArray: Product[] | unknown = yield call(
      ProductAPI.getProductDataArray,
      action.payload,
    );
    yield put(productActions.fetchAndAddProduct.success(productArray));
  } catch (e) {
    yield put(productActions.fetchAndAddProduct.failure(e));
  }
}

export function* fetchProductSaga(): Generator<ForkEffect<never>> {
  yield takeEvery(productActions.fetchAndAddProduct.request, fetchAndAddProduct);
}

export const productReducer = createReducer(initialState)
  .handleAction(productActions.fetchAndAddProduct.success,
    (state: ProductProps, action) => produce(
      state,
      (draft) => {
        action.payload.data.products.map((data) => draft.products.push(data));
      },
    ))
  .handleAction(productActions.getProductForId,
    (state: ProductProps, action) => produce(
      state,
      (draft) => {
        const selectedProduct = draft.products.find(
          (product) => product.productNo === action.payload,
        );
        draft.selectedProduct = cloneDeep(selectedProduct);
      },
    ));
