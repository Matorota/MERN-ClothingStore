import { ProductInput } from "../types/product";
import { GetProductsResponse, PostProductResponse } from "../types/response";
import { apiClient, ApiResponse } from "./api-client";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constants";

export const getProducts = async (
  page: number = DEFAULT_PAGE,
  pageSize: number = DEFAULT_PAGE_SIZE,
): Promise<ApiResponse<GetProductsResponse>> =>
  await apiClient.get(`/api/products?page=${page}&pageSize=${pageSize}`);

export const postProduct = async (
  product: ProductInput,
): Promise<ApiResponse<PostProductResponse>> =>
  await apiClient.post("/api/products", product);

export const updateProduct = async (
  _id: string,
  data: { title: string; photoSrc: string },
): Promise<ApiResponse<PostProductResponse>> =>
  await apiClient.put(`/api/products/${_id}`, {
    title: data.title,
    photoSrc: data.photoSrc,
  });

export const deleteProduct = async (
  id: string,
): Promise<ApiResponse<{ message: string }>> =>
  await apiClient.delete(`/api/products/${id}`);
