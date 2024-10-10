import { NgIf, AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { IProductResponse } from '../model/product';
import { ProductAddComponent } from '../product-add/product-add.component';
import { loadProduct, getProduct, deleteProduct, openPopup } from '../State/product-regular/product-actions/product-actions';
import { getProductListSelect } from '../State/product-regular/product-selector/product-selector';
import { getErrorMessage } from '../State/product-entity/product-entity-selector/product-entity-selector';
import { ProductEntityAddComponent } from '../product-entity-add/product-entity-add.component';

@Component({
  selector: 'app-peoduct-list-entity',
  templateUrl: './peoduct-list-entity.component.html',
  styleUrls: ['./peoduct-list-entity.component.css'],
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NgIf, AsyncPipe, NgFor],
})
export class PeoductListEntityComponent implements OnInit {
  products$: Observable<IProductResponse[]>;
  errorMessage$!: Observable<string>;

  constructor(private store: Store, private dialog: MatDialog) {
    this.store.dispatch(loadProduct());
    this.products$ = this.store.pipe(select(getProductListSelect));
        this.errorMessage$ = this.store.pipe(select(getErrorMessage));

  }

  ngOnInit() {}

  functionAdd() {
    this.openPopupFunc(0, 'Create Association');
  }

  functionEdit(code: number) {
    this.store.dispatch(getProduct({ id: code }));
    this.openPopupFunc(code, 'Edit Association');
  }
  functionDelete(id: number) {
    debugger;
    if (confirm('Are you sure')) {
      this.store.dispatch(deleteProduct({ code: id }));
      this.store.dispatch(loadProduct());
    }
  }

  openPopupFunc(code: number, title: string) {
    this.store.dispatch(openPopup());
    this.dialog.open(ProductEntityAddComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: { code: code, title: title },
    });
  }
}
