import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLoggedInSelector, isAnonymousSelector, currentProfileSelector } from '../State/login/login-selectors/login-selectors';
import { IProfileResponse } from '../model/profile';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [RouterLink, NgIf,AsyncPipe],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$!: Observable<boolean | null>;
  isAnonymous$!: Observable<boolean>;
  profileResponse$!: Observable<IProfileResponse | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector));
    this.profileResponse$ = this.store.pipe(select(currentProfileSelector));
  }
}
