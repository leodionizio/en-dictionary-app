import { useCallback, useContext, useState } from "react";
import { useApiService } from "@/app/api";
import { FavoritesContext } from "@/app/contexts/favorites-context";
import { useToastMessage } from "./toast";

export const useFavorites = () => {
  const apiService = useApiService();
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToastMessage();

  const isFavoriteWord = (word: string) => {
    return favorites.some((favorite) => favorite.word === word);
  };

  const getFavoritesWords = useCallback(async () => {
    setLoading(true);

    try {
      const { results } = await apiService.user.getUserFavorites();
      setFavorites(results);
      return results;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [apiService, setFavorites]);

  const addWordToFavorites = useCallback(
    async (word: string) => {
      setLoading(true);

      try {
        await apiService.dictionary.addWordToFavorites(word);
        getFavoritesWords();
        toast.success(`Word ${word} added to favorites!`);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
    [apiService, getFavoritesWords, loading, setLoading]
  );

  const removeWordFromFavorites = useCallback(
    async (word: string) => {
      setLoading(true);

      try {
        await apiService.dictionary.removeWordFromFavorites(word);
        getFavoritesWords();
        toast.success(`Word ${word} removed from favorites!`);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
    [apiService, getFavoritesWords]
  );

  return {
    addWordToFavorites,
    removeWordFromFavorites,
    isFavoriteWord,
    getFavoritesWords,
    favorites,
    loading,
  };
};
