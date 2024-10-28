"use client";

import { useRouter } from "next/navigation";
import { Button } from "../atoms";
import clsx from "clsx";
import { useTranslation } from "@/app/i18n/client";

const Back = ({ classNames, lng }: { classNames?: string; lng: string }) => {
  const router = useRouter();
  const { t } = useTranslation(lng);
  const handleBack = () => {
    router.back();
  };

  return (
    <Button
      text={t("back")}
      onClick={handleBack}
      classNames={clsx("text-xl md:text-2xl", classNames)}
      variant="text"
    />
  );
};

export default Back;
