export interface IProfileResponse {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}

export interface IProfileRequest {
  Authorization:string | null
}