import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuthState } from '../auth-state/auth-state';

export const loginFeatureSelector = createFeatureSelector<IAuthState>('login');

// Selector to determine if submitting
export const loginIsSubmittingSelector = createSelector(
  loginFeatureSelector,
  (state: IAuthState) => state.isSubmitting
);

export const loginValidationErrorsSelector = createSelector(
  loginFeatureSelector,
  (state: IAuthState) => state.validationError
);

export const isLoggedInSelector = createSelector(
  loginFeatureSelector,
  (state: IAuthState) => state.isLoggedIn
);

export const isAnonymousSelector = createSelector(
  loginFeatureSelector,
  (state: IAuthState) => state.isLoggedIn === false
);

export const currentProfileSelector = createSelector(
  loginFeatureSelector,
  (state: IAuthState) => state.ProfileResponse
);
