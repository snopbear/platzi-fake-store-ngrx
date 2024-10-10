import {  IProductEntityResponse, IProductEntityResponseModel } from '../../../model/product-entity';

import { createEntityAdapter } from '@ngrx/entity';


export const productEntityAdapter = createEntityAdapter<IProductEntityResponse>({
  selectId: (productEntity: IProductEntityResponse) => productEntity.id,
  sortComparer: (a: IProductEntityResponse, b: IProductEntityResponse) =>
    a.title.localeCompare(b.title),
});
export const productEntityResponseState: IProductEntityResponseModel =
  productEntityAdapter.getInitialState({
    errorMessage: '',
    isLoading: false,
  });
