import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

export const BackButton = () => {
  const router = useRouter();

  return (
    <Button isIconOnly variant="light" onClick={() => router.back()}>
      <AiOutlineArrowLeft size={24} />
    </Button>
  );
};
