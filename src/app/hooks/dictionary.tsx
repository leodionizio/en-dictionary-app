import { useCallback, useState } from "react";
import { useApiService } from "@/app/api";
import { Paginated } from "@/app/types/pagination";
import { useToastMessage } from "./toast";

export const useDictionary = () => {
  const [paginatedWords, setPaginatedWords] = useState<Paginated<string>>();
  const [words, setWords] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToastMessage();
  const apiService = useApiService();
  // Adicionar os parametros de paginação e filtro
  const getWords = useCallback(async () => {
    setLoading(true);
    try {
      const paginatedWords = await apiService.dictionary.getWords();
      setPaginatedWords(paginatedWords);
      setWords([...words, ...paginatedWords.results]);
      return paginatedWords.results;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [setLoading, apiService, setPaginatedWords, setWords, toast]);

  const getWordDetails = useCallback(
    async (word: string) => {
      setLoading(true);
      try {
        return await apiService.dictionary.getWordDetails(word);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, apiService, setPaginatedWords, setWords, toast]
  );

  return { getWords, getWordDetails, words, paginatedWords, loading };
};
