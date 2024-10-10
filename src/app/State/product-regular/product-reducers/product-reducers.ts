import { createReducer, on } from '@ngrx/store';

import * as productAction from '../product-actions/product-actions';
import { ProductState } from '../product-state/product-state';

const _ProductReducer = createReducer(
  ProductState,

  on(productAction.loadProductSuccess, (state, action) => {
    return {
      ...state,
      list: action.list,
      errorMessage: '',
    };
  }),
  on(productAction.loadProductFail, (state, action) => {
    return {
      ...state,
      list: [],
      errorMessage: action.errorMessage,
    };
  }),
  on(productAction.addProductSuccess, (state, action) => {
   return {
     ...state,
     list: [...state.list, action.inputData],
     errorMessage: '',
   };
  }),

  on(productAction.getProductSuccess, (state, action) => {
    return {
      ...state,
      productObj: action.obj,
      errorMessage: '',
    };
  }),
  on(productAction.updateProductSuccess, (state, action) => {
    return {
      ...state,
      list: state.list,
      errorMessage: '',
    };
  }),
  on(productAction.deleteProductSuccess, (state, action) => {
    return {
      ...state,
      list: state.list,
      errorMessage: '',
    };
  }),
  on(productAction.openPopup, (state, action) => {
    return {
      ...state,
      productObj: {
        id: 0,
        title: '',
        price: 0,
        description: '',
        category: {
          id: 0,
          name: '',
          image: '',
        },
        images: [],
      },
    };
  })
);

export function ProductReducer(state: any, actions: any) {
  return _ProductReducer(state, actions);
}
