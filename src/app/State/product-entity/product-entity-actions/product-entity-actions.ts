import { createAction, props } from '@ngrx/store';
import { IProductResponse } from '../../../model/product';
import { ProductEntityActionsType } from '../product-entity-types/product-entity-types';
import { IProductEntityResponse } from '../../../model/product-entity';
import { Update } from '@ngrx/entity';

//load
export const loadProduct = createAction(
  ProductEntityActionsType.LOAD_PRODUCT_ENTITY
);
export const loadProductSuccess = createAction(
  ProductEntityActionsType.LOAD_PRODUCT_ENTITY_SUCCESS,
  props<{ list: IProductResponse[] }>()
);
export const loadProductFail = createAction(
  ProductEntityActionsType.LOAD_PRODUCT_ENTITY_FAIL,
  props<{ errorMessage: string }>()
);

//add

export const addProduct = createAction(
  ProductEntityActionsType.ADD_PRODUCT_ENTITY,
  props<{ inputData: IProductResponse }>()
);
export const addProductSuccess = createAction(
  ProductEntityActionsType.ADD_PRODUCT_ENTITY_SUCCESS,
  props<{ inputData: IProductEntityResponse }>()
);

//update
export const updateProduct = createAction(
  ProductEntityActionsType.UPDATE_PRODUCT_ENTITY,
  props<{ inputData: IProductEntityResponse }>()
);
export const updateProductSuccess = createAction(
  ProductEntityActionsType.UPDATE_PRODUCT_ENTITY_SUCCESS,
  props<{ inputData: Update<IProductEntityResponse> }>()
);

export const deleteProduct = createAction(
  ProductEntityActionsType.DELETE_PRODUCT_ENTITY,
  props<{ code: number }>()
);
export const deleteProductSuccess = createAction(
  ProductEntityActionsType.DELETE_PRODUCT_ENTITY_SUCCESS,
  props<{ code: number }>()
);

//get by
export const getProduct = createAction(
  ProductEntityActionsType.GET_PRODUCT_ENTITY,
  props<{ id: number }>()
);
export const getProductSuccess = createAction(
  ProductEntityActionsType.GET_PRODUCT_ENTITY_SUCCESS,
  props<{ obj: IProductEntityResponse }>()
);

//popup
export const openPopup = createAction(
  ProductEntityActionsType.OPEN_POPUP_ENTITY
);
