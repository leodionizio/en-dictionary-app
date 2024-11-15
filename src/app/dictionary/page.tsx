"use client";
import { useEffect } from "react";
import { Autocomplete, AutocompleteItem, Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useDictionary } from "@/app/hooks/dictionary";
import { useHistory } from "@/app/hooks/history";
import { WordItem } from "@/app/components/word-item";
import { useFavorites } from "@/app/hooks/favorites";
import withAuth from "@/app/guard/with-auth";

const DictionaryPage = () => {
  const { getWords, words, loading } = useDictionary();
  const { getHistory, uniqueHistory } = useHistory();
  const { getFavoritesWords } = useFavorites();
  const router = useRouter();

  const redirectToWordDetails = (key: any) => {
    const { word } = uniqueHistory[key];
    router.push(`dictionary/${word}/details`);
  };

  useEffect(() => {
    getWords();
    getHistory();
    getFavoritesWords();
  }, []);

  return loading ? (
    <div className="flex justify-center">
      <Spinner color="primary" labelColor="primary" />
    </div>
  ) : (
    <div className="flex flex-col gap-4 full-width">
      <Autocomplete
        label="Select an recent word"
        fullWidth
        className="mb-6"
        onSelectionChange={(key) => redirectToWordDetails(key)}
      >
        {uniqueHistory.map((wordAdded, index) => (
          <AutocompleteItem key={index} value={wordAdded.word}>
            {wordAdded.word}
          </AutocompleteItem>
        ))}
      </Autocomplete>

      {words.map((word) => (
        <WordItem summaryWord={{ word }} key={word} />
      ))}
    </div>
  );
};

export default withAuth(DictionaryPage);
