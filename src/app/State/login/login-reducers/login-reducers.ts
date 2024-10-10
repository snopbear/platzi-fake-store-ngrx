import { Action, createReducer, on } from "@ngrx/store";
import { IAuthState } from "../auth-state/auth-state";
import { getCurrentProfileAction, getCurrentProfileFailureAction, getCurrentProfileSuccessAction, loginAction, loginFailureAction, loginSuccessAction } from "../login-actions/login-actions";

const InitialState: IAuthState = {
  isSubmitting: false,
  isLoggedIn: false,
  token: null,
  validationError: null,
  ProfileResponse: null,
};


const loginReducer = createReducer(
  InitialState,
  on(loginAction, (state: IAuthState) => ({
    ...state,
    isSubmitting: true,
    validationError: null,
  })),
  on(
    loginSuccessAction,
    (state, action): IAuthState => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      token: action.token,
    })
  ),
  on(
    loginFailureAction,
    (state, action): IAuthState => ({
      ...state,
      isSubmitting: false,
      validationError: action.backendError,
    })
  ),

  on(getCurrentProfileAction, (state: IAuthState) => ({
    ...state,
  })),
  on(
    getCurrentProfileSuccessAction,
    (state, action): IAuthState => ({
      ...state,
      isLoggedIn: true, //set to true when registration success,
      ProfileResponse: action.profileResponse, //set user details
    })
  ),
  on(
    getCurrentProfileFailureAction,
    (state, action): IAuthState => ({
      ...state,
      isLoggedIn: false,
      ProfileResponse: null,
    })
  )
);


export function LoginReducer(state:any,action:Action){
    return loginReducer(state,action);
}
