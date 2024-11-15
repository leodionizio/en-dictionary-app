"use client";
import React, { createContext, useState, ReactNode, FC } from "react";
import { WordAdded } from "../types/dictionary";

interface FavoriteContextType {
  favorites: WordAdded[];
  setFavorites: (favorites: WordAdded[]) => void;
}

const defaultContext: FavoriteContextType = {
  favorites: [],
  setFavorites: () => {},
};

export const FavoritesContext =
  createContext<FavoriteContextType>(defaultContext);

export const FavoriteProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<WordAdded[]>([]);

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
