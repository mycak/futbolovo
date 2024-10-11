import { paths } from "@/constants/paths";
import { Button } from "../atoms";
import Back from "./Back";
import clsx from "clsx";

const NotFound = ({
  is404,
  classNames,
}: {
  is404: boolean;
  classNames?: string;
}) => {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center grow",
        classNames
      )}
    >
      <div className="flex flex-col items-center justify-center border border-grass-40 p-12">
        <i className="fa-solid fa-bomb fa-6x text-ivory-150 mb-8" />
        <h1 className="text-3xl text-center mb-4 text-red-400">
          Ups! Nieudana kiwka...
        </h1>
        <p className="text-8xl text-center text-grass-50 mb-5">
          {is404 ? "Błąd 500" : "Coś poszło nie tak ;("}
        </p>
        {is404 ? (
          <Button
            classNames="h-[38px] text-xl bg-grass-40"
            text="Strona główna"
            asLink
            href={paths.Dashboard}
          />
        ) : (
          <Back />
        )}
      </div>
    </div>
  );
};

export default NotFound;
