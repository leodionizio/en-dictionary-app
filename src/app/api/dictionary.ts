import { AxiosInstance } from "axios";
import { WordDetails } from "@/app/types/dictionary";
import { Paginated } from "@/app/types/pagination";
import { apiErrorHandler } from "@/app/utils/api-error-handler";
const dictionaryPath = "entries/en";

export type GetWordsParams = {
  cursor?: string;
};

export const dictionaryService = (apiClient: AxiosInstance) => {
  const getWords = async (
    params?: GetWordsParams
  ): Promise<Paginated<string>> => {
    try {
      const response = await apiClient.get(dictionaryPath, { params });
      return response.data;
    } catch (error) {
      const errorMessage = apiErrorHandler(error);
      throw new Error(errorMessage);
    }
  };

  const getWordDetails = async (word: string): Promise<WordDetails> => {
    try {
      const response = await apiClient.get(`${dictionaryPath}/${word}`);
      return response.data;
    } catch (error) {
      const errorMessage = apiErrorHandler(error);
      throw new Error(errorMessage);
    }
  };

  const addWordToFavorites = async (word: string): Promise<void> => {
    try {
      await apiClient.post(`${dictionaryPath}/${word}/favorite`);
    } catch (error) {
      const errorMessage = apiErrorHandler(error);
      throw new Error(errorMessage);
    }
  };

  const removeWordFromFavorites = async (word: string): Promise<void> => {
    try {
      await apiClient.delete(`${dictionaryPath}/${word}/unfavorite`);
    } catch (error) {
      const errorMessage = apiErrorHandler(error);
      throw new Error(errorMessage);
    }
  };

  return {
    getWords,
    getWordDetails,
    addWordToFavorites,
    removeWordFromFavorites,
  };
};
