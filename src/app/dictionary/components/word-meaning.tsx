import { Meaning } from "@/app/types/dictionary";

type WordMeaningProps = {
  meaning: Meaning;
};
export const WordMeaning = ({ meaning }: WordMeaningProps) => {
  return (
    <div className="mb-1">
      <h4 className="font-bold">{meaning.partOfSpeech}</h4>
      {meaning.definitions.map((definition, index) => (
        <div key={index}>
          <li>{definition.definition}</li>
          {definition.synonyms.length > 0 && (
            <p>Synonyms: {definition.synonyms.join(", ")}</p>
          )}
          {definition.antonyms.length > 0 && (
            <p>Antonyms: {definition.antonyms.join(", ")}</p>
          )}
        </div>
      ))}
    </div>
  );
};
