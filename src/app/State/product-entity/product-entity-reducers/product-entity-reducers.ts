import { createReducer, on } from '@ngrx/store';

import * as productAction from '../product-entity-actions/product-entity-actions';
import { productEntityAdapter, productEntityResponseState } from '../product-entity-state/product-entity-state';

const _ProductEntityReducer = createReducer(
  productEntityResponseState,

  on(productAction.loadProductSuccess, (state, action) => {
    return productEntityAdapter.setAll(action.list, {
      ...state,
      errorMessage: '',
    });
  }),
  on(productAction.loadProductFail, (state, action) => {
    return {
      ...state,
      list: [],
      errorMessage: action.errorMessage,
    };
  }),
  on(productAction.addProductSuccess, (state, action) => {
    return productEntityAdapter.addOne(action.inputData, state);
  }),

  // on(productAction.getProductSuccess, (state, action) => {
  //   return {
  //     ...state,
  //     productObj: action.obj,
  //     errorMessage: '',
  //   };
  // }),
  on(productAction.updateProductSuccess, (state, action) => {
     return productEntityAdapter.updateOne(action.inputData, state);


  }),
  on(productAction.deleteProductSuccess, (state, action) => {
    return productEntityAdapter.removeOne(action.code, state);

  }),
  // on(productAction.openPopup, (state, action) => {
  //   return {
  //     ...state,
  //     productObj: {
  //       id: 0,
  //       title: '',
  //       price: 0,
  //       description: '',
  //       category: {
  //         id: 0,
  //         name: '',
  //         image: '',
  //       },
  //       images: [],
  //     },
  //   };
  // })
);

export function ProductEntityReducer(state: any, actions: any) {
  return _ProductEntityReducer(state, actions);
}
