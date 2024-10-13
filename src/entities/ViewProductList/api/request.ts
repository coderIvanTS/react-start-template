import { AxiosResponse } from "axios";
import axiosInstance from "../../../shared/axiosHelper/axiosHelper";
import { BASE_URL } from "../../../shared/fetchHelpers/fetchSettings";
import { Product, Sorting, TAddProductParams, TProductRaw, TUpdateProductParams } from "../model/types/types";

type Filters = {
  name?: string;
  ids?: string[];
  categoryIds?: string[];
  pagination?: {
    pageSize?: number;
    pageNumber?: number;
  };
  createdAt?: {
    gte?: string; // от - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
    lte?: string; // до - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
  }
  updatedAt?: {
    gte?: string; // от - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
    lte?: string; // до - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
  }
  sorting?: {
    type: 'ASC' | 'DESC';
    field: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'date';
  };
};

export const getProductsApi = async (pageSize: number, pageNumber: number, sorting: Sorting): Promise<TProductRaw> => {

  const url = `/products?${new URLSearchParams({
    pagination: JSON.stringify({
      pageSize,
      pageNumber,
    }),
    sorting: JSON.stringify(sorting),
  }).toString()}`

  const response = await axiosInstance.get<TProductRaw>(url);

  return response.data;
}

export const addProductApi = async (param: TAddProductParams) => {
  const response = await axiosInstance.post('/products', param);
  return response;
}

export const putProductApi = async( product: TUpdateProductParams) => {
  const response = await axiosInstance.put(`/products/${product.id}`, product);
}
