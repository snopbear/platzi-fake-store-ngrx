import { Component, Input, OnInit } from '@angular/core';
import { IBackendError } from '../../model/backend-error';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-backend-error',
  templateUrl: './backend-error.component.html',
  styleUrls: ['./backend-error.component.css'],
  standalone: true,
  imports: [NgFor],
})
export class BackendErrorComponent implements OnInit {
  @Input('backendErrors') backendErrors!: IBackendError;
  errorMessages!: string[];

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
      const backendError = this.backendErrors[name];

      // Check if backendError is an array, and if so, use join
      const messages = Array.isArray(backendError)
        ? backendError.join(' ')
        : backendError;

      // Return the formatted error message
      return `${name} ${messages}`;
    });
  }
}
