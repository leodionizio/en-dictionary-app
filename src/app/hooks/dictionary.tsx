import { useCallback, useState } from "react";
import { useApiService } from "@/app/api";
import { Paginated, PaginatedType } from "@/app/types/pagination";
import { useToastMessage } from "./toast";

export const useDictionary = () => {
  const [paginatedWords, setPaginatedWords] = useState<Paginated<string>>();
  const [words, setWords] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToastMessage();
  const apiService = useApiService();

  const getPaginationCursor = useCallback(
    (type: PaginatedType) => {
      const { hasNext, hasPrev, next, previous } = paginatedWords!;
      if (type === "next" && hasNext) return next;
      if (type === "prev" && hasPrev) return previous;

      return undefined;
    },
    [paginatedWords]
  );

  const getWords = useCallback(
    async (type?: PaginatedType) => {
      setLoading(true);
      try {
        const cursor = type ? getPaginationCursor(type) : undefined;
        const wordListPaginated = await apiService.dictionary.getWords({
          cursor,
        });
        setPaginatedWords(wordListPaginated);
        setWords([...words, ...wordListPaginated.results]);
        return wordListPaginated.results;
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
    [getPaginationCursor, apiService.dictionary, words, toast]
  );

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
    [setLoading, apiService, toast]
  );

  return { getWords, getWordDetails, words, paginatedWords, loading };
};
