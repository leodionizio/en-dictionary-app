export type WordAdded = {
  word: string;
  date?: string;
};

export type Phonetic = {
  text: string;
  audio?: string;
};

type Definition = {
  definition: string;
  example?: string;
  synonyms: string[];
  antonyms: string[];
};

export type Meaning = {
  partOfSpeech: string;
  definitions: Definition[];
};

type License = {
  name: string;
  url: string;
};

export type WordDetails = {
  id: string;
  createdAt: string;
  word: string;
  phonetic?: string;
  phonetics: Phonetic[];
  origin?: string;
  meanings: Meaning[];
  license: License;
  sourceUrls: string[];
};
