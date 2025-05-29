const BASE_URL = import.meta.env.VITE_BASE_SERVER_URL;

type ValidationErrors = Record<string, string> | null;

type ApiSuccess<T> = {
  data: T;
  status: number;
};

type ApiFailure = {
  data: null;
  status: number | null;
  error: {
    message: string;
    validationErrors: ValidationErrors;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

async function request<T = unknown>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  endpoint: string,
  body?: unknown,
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    const responseBody = await res.json();

    if (!res.ok) {
      const error = {
        message: responseBody?.message || "Something went wrong.",
        validationErrors: responseBody?.validationErrors || null,
      };
      return { data: null, status: res.status, error };
    }

    return {
      data: responseBody,
      status: res.status,
    };
  } catch (err: unknown) {
    return {
      data: null,
      status: null,
      error: {
        message: err instanceof Error ? err.message : "Unknown error occurred.",
        validationErrors: null,
      },
    };
  }
}

export const apiClient = {
  get: <T>(endpoint: string) => request<T>("GET", endpoint),
  post: <T>(endpoint: string, body: unknown) =>
    request<T>("POST", endpoint, body),
  put: <T>(endpoint: string, body: unknown) =>
    request<T>("PUT", endpoint, body),
  patch: <T>(endpoint: string, body: unknown) =>
    request<T>("PATCH", endpoint, body),
  delete: <T>(endpoint: string) => request<T>("DELETE", endpoint),
};
