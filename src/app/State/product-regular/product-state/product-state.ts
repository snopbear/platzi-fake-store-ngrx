import { IProductModel } from '../../../model/product';

export const ProductState: IProductModel = {
  list: [],
  errorMessage: '',
  productObj: {
    id: 0,
    title: '',
    price: 0,
    description: ''
  },
};
