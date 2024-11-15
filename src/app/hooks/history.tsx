import { useCallback, useState } from "react";
import { useApiService } from "@/app/api";
import { WordAdded } from "@/app/types/dictionary";
import { useToastMessage } from "./toast";

export const useHistory = () => {
  const [uniqueHistory, setUniqueHistory] = useState<WordAdded[]>([]);
  const apiService = useApiService();
  const { toast } = useToastMessage();

  const getHistory = useCallback(async () => {
    try {
      const { results } = await apiService.user.getUserHistory();
      const uniqueWords = Array.from(
        new Map(results.map((item) => [item.word, item])).values()
      );
      setUniqueHistory(uniqueWords);
      return results;
    } catch (error) {
      toast.error(error.message);
    }
  }, [toast, apiService, setUniqueHistory]);

  return { getHistory, uniqueHistory };
};
