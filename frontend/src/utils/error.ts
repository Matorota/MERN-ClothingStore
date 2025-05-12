import { ApiResponse } from "../api/api-client";

export const isResponseError = (response: ApiResponse<unknown>) => {
  return "error" in response;
};
