"use client";

import { useRouter } from "next/navigation";
import { Button } from "../atoms";

const Back = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Button
      text="Wróć"
      onClick={handleBack}
      classNames="text-2xl"
      variant="text"
    />
  );
};

export default Back;
