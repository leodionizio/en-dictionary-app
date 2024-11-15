import { Signin, SignedIn, Signup, SignedUp } from "./auth";
import { WordDetails } from "./dictionary";
import { Paginated } from "./pagination";

export type ApiService = {
  signin: (params: Signin) => Promise<SignedIn>;
  signup: (params: Signup) => Promise<SignedUp>;
  getWords: () => Promise<Paginated<string>>;
  getWordDetails: (word: string) => Promise<WordDetails>;
  addWordToFavorites: (word: string) => Promise<void>;
  removeWordFromFavorites: (word: string) => Promise<void>;
};
