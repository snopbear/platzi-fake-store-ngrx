import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONST_VARIABLES } from '../../@const/variables';
import { Observable } from 'rxjs';
import {  IProductResponse } from '../../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url = {
    products: 'products',
  };

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProductResponse[]> {
    return this.http.get<IProductResponse[]>(
      `${CONST_VARIABLES.API_ENDPOINT}/${this.url.products}`
    );
  }

  getByCode(code: number) {
    debugger;
    return this.http.get<IProductResponse>(
      `${CONST_VARIABLES.API_ENDPOINT}/${this.url.products}/${code}`
    );
  }
  delete(code: number) {
    return this.http.delete(
      `${CONST_VARIABLES.API_ENDPOINT}/${this.url.products}/${code}`
    );
  }
  update(data: IProductResponse) {
    return this.http.put(
      `${CONST_VARIABLES.API_ENDPOINT}/${this.url.products}/${data.id}`,
      data
    );
  }
  create(data: IProductResponse) {
    return this.http.post<IProductResponse>(
      `${CONST_VARIABLES.API_ENDPOINT}/${this.url.products}`,
      data
    );
  }
}
