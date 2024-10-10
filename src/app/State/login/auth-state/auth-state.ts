import { IBackendError } from "../../../model/backend-error";
import { IProfileResponse } from "../../../model/profile";
import { IToken } from "../../../model/token";

export interface IAuthState {
  isSubmitting: boolean;
  isLoggedIn: boolean;
  token: IToken | null;
  validationError: IBackendError | null;
  ProfileResponse: IProfileResponse | null;
}