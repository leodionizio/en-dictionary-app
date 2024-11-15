import { ApiError } from "../interfaces/api-error";

export const apiErrorHandler = (error: unknown) => {
  const apiError = error as ApiError;
  return apiError.response?.data?.message || apiError.message;
};
