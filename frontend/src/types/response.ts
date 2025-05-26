import { Product } from "./product";

export interface GetProductsResponse {
  products: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
  };
}

export type PostProductResponse = { addedProduct: Product };
