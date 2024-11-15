import { WordAdded } from "./dictionary";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
};

type ListWordAdded = {
  results: WordAdded[];
};

export type UserHistory = ListWordAdded;

export type UserFavorites = ListWordAdded;
