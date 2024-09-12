import clsx from "clsx";
import Image from "next/image";
import Button from "./Button";
import { paths } from "@/constants/paths";

const SiteDescription = ({ classNames }: { classNames?: string }) => {
  return (
    <div
      className={clsx(
        "bg-gray-900 -mx-8 px-8 py-12 flex justify-between gap-12",
        classNames
      )}
    >
      <div className="flex flex-col justify-center ">
        <div className="max-w-2xl">
          <h3 className="text-right text-5xl text-grass-20">
            Odkryj interaktywną mapę, która otwiera przed Tobą świat futbolowych
            możliwości!
          </h3>
          <p className="text-right text-xl mt-6">
            Znajdziesz tutaj wszystkie najważniejsze informacje o turniejach,
            ligach szóstek, szkółkach piłkarskich dla dzieci, boiskach do
            wynajęcia oraz usługach piłkarskich. Sprawdź, co dzieje się w Twojej
            okolicy i dołącz do gry!
          </p>
          <Button
            asLink
            href={paths.Map}
            text="Sprawdź!"
            classNames="px-5 py-3 text-3xl mt-8 opacity-90 block ml-auto hover:opacity-100"
          />
        </div>
      </div>
      <Image
        src="/images/map-overview.png"
        alt="overview"
        width={1920}
        height={1080}
        layout="responsive"
        className="max-w-xl h-full mr-auto mt-8"
      />
    </div>
  );
};

export default SiteDescription;
