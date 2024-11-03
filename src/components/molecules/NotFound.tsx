"use Client";
import { paths } from "@/constants/paths";
import { Button } from "../atoms";
import Back from "./Back";
import clsx from "clsx";
import { translate } from "@/app/i18n";

const NotFound = async ({
  is404,
  classNames,
  lng,
}: {
  is404: boolean;
  classNames?: string;
  lng: string;
}) => {
  const { t } = await translate(lng);
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center grow",
        classNames
      )}
    >
      <div className="flex flex-col items-center justify-center border border-grass-40 p-12">
        <i className="fa-solid fa-bomb fa-6x text-ivory-150 mb-8" />
        <h1 className="text-2xl md:text-3xl text-center mb-4 text-red-400">
          {t("notFound.smallDesc")}
        </h1>
        <p className="text-4xl md:text-8xl text-center text-grass-50 mb-5">
          {is404 ? t("notFound.error404") : t("notFound.error")}
        </p>
        {is404 ? (
          <Button
            classNames="h-[38px] text-xl bg-grass-40"
            text={t("navigation.mainPage")}
            asLink
            href={paths.Dashboard}
          />
        ) : (
          <Back lng={lng} />
        )}
      </div>
    </div>
  );
};

export default NotFound;
