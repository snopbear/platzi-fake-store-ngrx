import { createAction, props } from '@ngrx/store';
import { ProductActionsType } from '../product-types/product-types';
import {  IProductResponse } from '../../../model/product';


//load
export const loadProduct = createAction(ProductActionsType.LOAD_PRODUCT);
export const loadProductSuccess = createAction(
  ProductActionsType.LOAD_PRODUCT_SUCCESS,
  props<{ list: IProductResponse[] }>()
);
export const loadProductFail = createAction(
  ProductActionsType.LOAD_PRODUCT_FAIL,
  props<{ errorMessage: string }>()
);

//add

export const addProduct = createAction(
  ProductActionsType.ADD_PRODUCT,
  props<{ inputData: IProductResponse }>()
);
export const addProductSuccess = createAction(
  ProductActionsType.ADD_PRODUCT_SUCCESS,
  props<{ inputData: IProductResponse }>()
);

//update
export const updateProduct = createAction(
  ProductActionsType.UPDATE_PRODUCT,
  props<{ inputData: IProductResponse }>()
);
export const updateProductSuccess = createAction(
  ProductActionsType.UPDATE_PRODUCT_SUCCESS,
  props<{ inputData: IProductResponse }>()
);

export const deleteProduct = createAction(
  ProductActionsType.DELETE_PRODUCT,
  props<{ code: number }>()
);
export const deleteProductSuccess = createAction(
  ProductActionsType.DELETE_PRODUCT_SUCCESS,
  props<{ code: number }>()
);

//get by
export const getProduct = createAction(
  ProductActionsType.GET_PRODUCT,
  props<{ id: number }>()
);
export const getProductSuccess = createAction(
  ProductActionsType.GET_PRODUCT_SUCCESS,
  props<{ obj: IProductResponse }>()
);

//popup
export const openPopup = createAction(ProductActionsType.OPEN_POPUP);
