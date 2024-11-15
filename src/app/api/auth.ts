import { AxiosInstance } from "axios";
import { Signin, SignedIn, Signup, SignedUp } from "@/app/types/auth";
import { apiErrorHandler } from "@/app/utils/api-error-handler";
const authPath = "/auth";

export const authService = (apiClient: AxiosInstance) => {
  const signin = async (bodyData: Signin): Promise<SignedIn> => {
    try {
      const response = await apiClient.post(`${authPath}/signin`, bodyData);
      return response.data;
    } catch (error) {
      const errorMessage = apiErrorHandler(error);
      throw new Error(errorMessage);
    }
  };

  const signup = async (bodyData: Signup): Promise<SignedUp> => {
    try {
      const response = await apiClient.post(`${authPath}/signup`, bodyData);
      return response.data;
    } catch (error) {
      const errorMessage = apiErrorHandler(error);
      throw new Error(errorMessage);
    }
  };

  return { signin, signup };
};
