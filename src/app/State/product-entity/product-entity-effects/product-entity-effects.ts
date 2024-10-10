import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as productAction from '../product-entity-actions/product-entity-actions';
import {
  catchError,
  exhaustMap,
  of,
  map,
  switchMap,
  concatMap,
  mergeMap,
} from 'rxjs';
import { showAlert } from '../../common/app.actions';
import { ProductsService } from '../../../services/products/products.service';
import { ResultType } from '../../common/result-type.enum';
import { IProductEntityResponse } from '../../../model/product-entity';
import { Update } from '@ngrx/entity';

@Injectable()
export class ProductEntityEffects {
  private service = inject(ProductsService);
  private action$ = inject(Actions);

  loadProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType(productAction.loadProduct),
      exhaustMap((action) => {
        return this.service.getProducts().pipe(
          map((data) => {
            return productAction.loadProductSuccess({ list: data });
          }),
          catchError((_error) =>
            of(
              productAction.loadProductFail({
                errorMessage: _error.message,
              })
            )
          )
        );
      })
    )
  );

  getProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType(productAction.getProduct),
      switchMap((action) => {
        return this.service.getByCode(action.id).pipe(
          map((data) => {
            debugger;
            return productAction.getProductSuccess({ obj: data });
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'failed to create a product' + _error.message,
                resultType: ResultType.FAIL,
              })
            )
          )
        );
      })
    )
  );

  addProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType(productAction.addProduct),
      concatMap((action) => {
        return this.service.create(action.inputData).pipe(
          switchMap((data) => {
            return of(
              productAction.addProductSuccess({
                inputData: action.inputData,
              }),
              showAlert({
                message: 'Product added successfully',
                resultType: ResultType.SUCCESS,
              })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'failed to create a product',
                resultType: ResultType.FAIL,
              })
            )
          )
        );
      })
    )
  );

  editProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType(productAction.updateProduct),
      switchMap((action) => {
        return this.service.update(action.inputData).pipe(
          concatMap((data) => {
            debugger;
            const updatedRecord: Update<IProductEntityResponse> = {
              id: action.inputData.id,
              changes: action.inputData,
            };

            return of(
              productAction.updateProductSuccess({
                inputData: updatedRecord,
              }),

              showAlert({
                message: 'Product updated successfully',
                resultType: ResultType.SUCCESS,
              })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'failed to create a product',
                resultType: ResultType.FAIL,
              })
            )
          )
        );
      })
    )
  );

  deleteProduct$ = createEffect(() =>
    this.action$.pipe(
      ofType(productAction.deleteProduct),
      switchMap((action) => {
        return this.service.delete(action.code).pipe(
          mergeMap((data) => {
            return of(
              productAction.deleteProductSuccess({
                code: action.code,
              }),

              showAlert({
                message: 'Product Delete successfully',
                resultType: ResultType.SUCCESS,
              })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'failed to delete a product',
                resultType: ResultType.FAIL,
              })
            )
          )
        );
      })
    )
  );
}
