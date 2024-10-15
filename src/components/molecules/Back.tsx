"use client";

import { useRouter } from "next/navigation";
import { Button } from "../atoms";
import clsx from "clsx";

const Back = ({ classNames }: { classNames?: string }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Button
      text="Wróć"
      onClick={handleBack}
      classNames={clsx("text-xl md:text-2xl", classNames)}
      variant="text"
    />
  );
};

export default Back;
