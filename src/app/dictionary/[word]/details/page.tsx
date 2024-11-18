"use client";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardBody, CardHeader, Spinner } from "@nextui-org/react";
import { useDictionary } from "@/app/hooks/dictionary";
import { WordDetails } from "@/app/types/dictionary";
import { BackButton } from "@/app/components/back-button";
import { FavoriteButton } from "@/app/components/favorite-button";
import { WordPhonetic } from "../../components/word-phonetic";
import { WordMeaning } from "../../components/word-meaning";
import withAuth from "@/app/guard/with-auth";

const WordPage = () => {
  const [wordDetails, setWordDetails] = useState<WordDetails>();
  const { getWordDetails, loading } = useDictionary();
  const params = useParams();
  const { word: wordParam } = params;

  const getWord = useCallback(async () => {
    const word = await getWordDetails(wordParam as string);
    if (word) setWordDetails(word);
  }, [getWordDetails, wordParam]);

  useEffect(() => {
    getWord();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading && !wordDetails ? (
    <div className="flex justify-center">
      <Spinner color="primary" labelColor="primary" />
    </div>
  ) : (
    <div>
      <div
        className="flex justify-between"
        style={{ margin: "-14px -8px 16px" }}
      >
        <BackButton />
        {wordDetails && <FavoriteButton word={wordDetails.word} />}
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-bold mb-4 text-3xl">{wordDetails?.word}</h2>
        <Card>
          <CardHeader>
            <h3 className="font-bold">Phonetic</h3>
          </CardHeader>

          <CardBody>
            {wordDetails?.phonetics.map((phonetic, index) => (
              <WordPhonetic key={index} phonetic={phonetic} />
            ))}
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="font-bold">Meanings</h3>
          </CardHeader>
          <CardBody>
            {wordDetails?.meanings.map((meaning, index) => (
              <WordMeaning key={index} meaning={meaning} />
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default withAuth(WordPage);
