"use client";
import { useEffect } from "react";
import { useFavorites } from "@/app/hooks/favorites";
import { WordItem } from "@/app/components/word-item";
import withAuth from "@/app/guard/with-auth";
import { Spinner } from "@nextui-org/react";

const UserFavoritesPage = () => {
  const { getFavoritesWords, favorites, loading } = useFavorites();

  useEffect(() => {
    getFavoritesWords();
  }, []);

  return loading ? (
    <div className="flex justify-center">
      <Spinner color="primary" labelColor="primary" />
    </div>
  ) : (
    <div>
      <div className="flex flex-col gap-4">
        {favorites.map((favorite) => (
          <WordItem summaryWord={favorite} key={favorite.word} />
        ))}
      </div>
    </div>
  );
};

export default withAuth(UserFavoritesPage);
