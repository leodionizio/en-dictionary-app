import { AxiosInstance } from "axios";
import { UserFavorites, UserHistory, UserProfile } from "@/app/types/user";
import { apiErrorHandler } from "@/app/utils/api-error-handler";
const userPath = "user/me";

export const userService = (apiClient: AxiosInstance) => {
  const getUserProfile = async (): Promise<UserProfile> => {
    try {
      const response = await apiClient.get(`${userPath}`);
      return response.data;
    } catch (error) {
      const errorMessage = apiErrorHandler(error);
      throw new Error(errorMessage);
    }
  };

  const getUserHistory = async (): Promise<UserHistory> => {
    try {
      const response = await apiClient.get(`${userPath}/history`);
      return response.data;
    } catch (error) {
      const errorMessage = apiErrorHandler(error);
      throw new Error(errorMessage);
    }
  };

  const getUserFavorites = async (): Promise<UserFavorites> => {
    try {
      const response = await apiClient.get(`${userPath}/favorites`);
      return response.data;
    } catch (error) {
      const errorMessage = apiErrorHandler(error);
      throw new Error(errorMessage);
    }
  };

  return { getUserProfile, getUserHistory, getUserFavorites };
};
