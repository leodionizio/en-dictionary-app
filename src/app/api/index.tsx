import { useApiClient } from "./api-client";
import { authService } from "./auth";
import { dictionaryService } from "./dictionary";
import { userService } from "./user";

export const useApiService = () => {
  const apiClient = useApiClient();

  return {
    auth: authService(apiClient),
    dictionary: dictionaryService(apiClient),
    user: userService(apiClient),
  };
};
