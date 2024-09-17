import Image from "next/image";
import Button from "./Button";
import { paths } from "@/constants/paths";
import PageWrapper from "./PageWrapper";

const SiteDescription = () => {
  return (
    <PageWrapper classNames="bg-gray-900 py-12 flex justify-between gap-12">
      <div className="flex flex-col justify-center ">
        <div className="max-w-2xl">
          <h3 className="text-right text-5xl text-grass-20">
            Odkryj interaktywną mapę, która otwiera przed Tobą świat futbolowych
            możliwości!
          </h3>
          <p className="text-right text-xl mt-6">
            Znajdziesz tutaj wszystkie najważniejsze informacje o turniejach,
            ligach szóstek, szkółkach piłkarskich dla dzieci, boiskach do
            wynajęcia oraz usługach piłkarskich.{" "}
            <span className="text-grass-50">
              Sprawdź, co dzieje się w Twojej okolicy i dołącz do gry!
            </span>
          </p>
          <Button
            asLink
            href={paths.Map}
            text="Sprawdź!"
            classNames="px-5 py-3 text-3xl mt-8 opacity-90 block ml-auto hover:opacity-100 animate-shake"
          />
        </div>
      </div>
      <Image
        src="/images/map-overview.png"
        alt="overview"
        width={1920}
        height={1080}
        className="max-w-xl h-full mr-auto"
      />
    </PageWrapper>
  );
};

export default SiteDescription;
