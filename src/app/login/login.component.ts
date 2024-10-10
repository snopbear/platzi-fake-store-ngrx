import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { IBackendError } from '../model/backend-error';
import { select, Store } from '@ngrx/store';
import { loginIsSubmittingSelector, loginValidationErrorsSelector } from '../State/login/login-selectors/login-selectors';
import { loginAction } from '../State/login/login-actions/login-actions';
import { ILogin } from '../model/login';
import { BackendErrorComponent } from '../shared/backend-error/backend-error.component';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, BackendErrorComponent,AsyncPipe,JsonPipe,NgIf],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isSubmitting$!: Observable<boolean>;
  backendError$!: Observable<IBackendError | null>;

  constructor(private store: Store, private formBuilder: FormBuilder) {
    this.initializeForm();
    this.initializeValues();
  }

  ngOnInit() {}

  initializeForm(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  private initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(loginIsSubmittingSelector));
    this.backendError$ = this.store.pipe(select(loginValidationErrorsSelector));
  }

  onSubmit(): void {
    const request: ILogin = this.form.value;
    this.store.dispatch(loginAction({ loginRequest: request }));
  }
}
