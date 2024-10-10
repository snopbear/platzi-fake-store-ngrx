import { createFeatureSelector, createSelector } from '@ngrx/store';
import {  IProductEntityResponse, IProductEntityResponseModel } from '../../../model/product-entity';
import { productEntityAdapter } from '../product-entity-state/product-entity-state';


const getProductEntityState = createFeatureSelector<IProductEntityResponseModel>('associateEntity');

const productSelector = productEntityAdapter.getSelectors();
export const getProductList = createSelector(
  getProductEntityState,
  productSelector.selectAll
);

const selectedEntities = createSelector(
  getProductEntityState,
  productSelector.selectEntities
);


export const getAssociate = (id: number) =>
  createSelector(selectedEntities, (state) => state[id]);

export const getErrorMessage = createSelector(
  getProductEntityState,
  (state) => state.errorMessage
);
