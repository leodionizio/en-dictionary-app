import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, CardBody } from "@nextui-org/react";
import { WordAdded } from "@/app/types/dictionary";
import { FavoriteButton } from "@/app/components/favorite-button";

export type WordItemProps = {
  summaryWord: WordAdded;
};
export const WordItem = ({ summaryWord }: WordItemProps) => {
  const router = useRouter();

  const redirectToWordDetails = useCallback(() => {
    router.push(`/dictionary/${summaryWord.word}/details`);
  }, []);

  return (
    <Card>
      <CardBody className="flex flex-row justify-between items-center">
        <div className="flex gap-2 items-center">
          <FavoriteButton word={summaryWord.word} />

          <div>
            <h4>{summaryWord.word}</h4>
            {summaryWord.date && (
              <p className="text-xs">Added at: {summaryWord.date}</p>
            )}
          </div>
        </div>

        <div>
          <Button variant="light" onPress={() => redirectToWordDetails()}>
            Show details
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
