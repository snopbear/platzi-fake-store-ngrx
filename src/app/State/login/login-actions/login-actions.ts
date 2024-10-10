import { createAction, props } from "@ngrx/store";
import { LoginActionType } from "../login-actions-type/login-actions-type";
import { ILogin } from "../../../model/login";
import { IBackendError } from "../../../model/backend-error";
import { IToken } from "../../../model/token";
import { IProfileResponse } from "../../../model/profile";

export const loginAction = createAction(
    LoginActionType.LOGIN,
    props<{loginRequest:ILogin}>()
);

export const loginSuccessAction = createAction(
    LoginActionType.LOGIN_SUCCESS,
    props<{token:IToken}>()
);

export const loginFailureAction = createAction(
  LoginActionType.LOGIN_FAILURE,
  props<{ backendError: IBackendError }>()
);


/*****************************************************/


export const getCurrentProfileAction = createAction(
  LoginActionType.GET_CURRENT_PROFILE // It will send as object
);
export const getCurrentProfileSuccessAction = createAction(
  LoginActionType.GET_CURRENT__PROFILE_SUCCESS,
  props<{ profileResponse: IProfileResponse }>() // It will send as object
);
export const getCurrentProfileFailureAction = createAction(
  LoginActionType.GET_CURRENT__PROFILE_FAILURE // It will send as object
);
