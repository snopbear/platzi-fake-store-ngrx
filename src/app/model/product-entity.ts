import { EntityState } from "@ngrx/entity";

export interface IProductEntityResponse {
  id: number;
  title: string;
  price: number;
  description: string
}

export interface ICategory {
  id: number;
  name: string;
  image: string;
}


export interface IProductEntityResponseModel
  extends EntityState<IProductEntityResponse> {
  errorMessage: string;
  isLoading: boolean;
}
