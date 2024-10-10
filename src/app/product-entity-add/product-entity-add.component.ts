import { NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { IProductResponse } from '../model/product';
import { ProductAddComponent } from '../product-add/product-add.component';
import { addProduct, updateProduct, loadProduct } from '../State/product-regular/product-actions/product-actions';
import { getProductSelect } from '../State/product-regular/product-selector/product-selector';

@Component({
  selector: 'app-product-entity-add',
  templateUrl: './product-entity-add.component.html',
  styleUrls: ['./product-entity-add.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgIf,
  ],
})
export class ProductEntityAddComponent implements OnInit {
  title = 'Create Associate';
  isEdit = false;
  dialogData: any;
  productForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private ref: MatDialogRef<ProductAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store
  ) {
    this.productForm = this.builder.group({
      id: [0],
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  ClosePopup() {
    this.ref.close();
  }

  SaveProduct() {
    debugger;
    if (this.productForm.valid) {
      const _obj: IProductResponse = {
        id: this.productForm.value.id,
        title: this.productForm.value.title,
        price: this.productForm.value.price,
        description: this.productForm.value.description,
      };
      if (_obj.id === 0) {
        this.store.dispatch(addProduct({ inputData: _obj }));
      } else {
        this.store.dispatch(updateProduct({ inputData: _obj }));
      }
      this.store.dispatch(loadProduct());

      this.ClosePopup();
    }
  }
  ngOnInit() {
    this.dialogData = this.data;
    this.title = this.dialogData.title;
    this.store.select(getProductSelect).subscribe((res: IProductResponse) => {
      this.productForm.setValue({
        id: res.id,
        title: res.title,
        price: res.price,
        description: res.description,
      });
    });
  }
}
