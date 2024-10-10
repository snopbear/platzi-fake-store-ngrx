import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProductModel } from '../../../model/product';


const getProductState = createFeatureSelector<IProductModel>('product');

export const getProductListSelect = createSelector(getProductState, (state) => {
  return state.list;
});

export const getProductSelect = createSelector(getProductState, (state) => {
  return state.productObj;
});
