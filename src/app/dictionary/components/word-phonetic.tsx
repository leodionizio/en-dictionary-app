import { Phonetic } from "@/app/types/dictionary";
import { Button } from "@nextui-org/react";
import { AiFillPlayCircle } from "react-icons/ai";

type WordPhoneticProps = {
  phonetic: Phonetic;
};

export const WordPhonetic = ({ phonetic }: WordPhoneticProps) => {
  return (
    <div className="flex justify-between items-center">
      <p>{phonetic.text}</p>
      {phonetic.audio && (
        <Button
          color="primary"
          isIconOnly
          radius="full"
          variant="light"
          onClick={() => new Audio(phonetic.audio).play()}
        >
          <AiFillPlayCircle size={24} />
        </Button>
      )}
    </div>
  );
};
