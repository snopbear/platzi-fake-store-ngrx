
export interface IProductResponse {
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


export interface IProductModel {
  list: IProductResponse[];
  productObj: IProductResponse;
  errorMessage: string;
}
