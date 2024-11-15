import { Button, Spinner } from "@nextui-org/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useFavorites } from "@/app/hooks/favorites";
import { useCallback } from "react";

type FavoriteButtonProps = {
  word: string;
};
export const FavoriteButton = ({ word }: FavoriteButtonProps) => {
  const {
    addWordToFavorites,
    removeWordFromFavorites,
    isFavoriteWord,
    loading,
  } = useFavorites();

  const handleFavoriteStatus = useCallback(() => {
    if (isFavoriteWord(word)) {
      removeWordFromFavorites(word);
      return;
    }
    addWordToFavorites(word);
  }, [removeWordFromFavorites, addWordToFavorites, word]);

  return loading ? (
    <div className="flex justify-center">
      <Spinner color="primary" labelColor="primary" />
    </div>
  ) : (
    <Button
      isIconOnly
      color="danger"
      aria-label="Favorite"
      radius="full"
      variant="light"
      onClick={() => handleFavoriteStatus()}
    >
      {isFavoriteWord(word) ? (
        <AiFillHeart size={24} />
      ) : (
        <AiOutlineHeart size={24} />
      )}
    </Button>
  );
};
