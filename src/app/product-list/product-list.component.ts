import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ProductsService } from '../services/products/products.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { deleteProduct, getProduct, loadProduct, openPopup } from '../State/product-regular/product-actions/product-actions';
import { MatDialog } from '@angular/material/dialog';
import { ProductAddComponent } from '../product-add/product-add.component';
import { IProductResponse } from '../model/product';
import { getProductListSelect } from '../State/product-regular/product-selector/product-selector';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NgIf, AsyncPipe, NgFor],
})
export class ProductListComponent implements OnInit {
  products$: Observable<IProductResponse[]>;
  constructor(private store: Store, private dialog: MatDialog) {
    this.store.dispatch(loadProduct());
    this.products$ = this.store.pipe(select(getProductListSelect));
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
    debugger
    if (confirm('Are you sure')) {
      this.store.dispatch(deleteProduct({ code: id }));    
      this.store.dispatch(loadProduct());      
    }
  }

  openPopupFunc(code: number, title: string) {
    this.store.dispatch(openPopup());
    this.dialog.open(ProductAddComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: { code: code, title: title },
    });
  }
}
