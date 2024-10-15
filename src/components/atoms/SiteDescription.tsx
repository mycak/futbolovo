import Image from "next/image";
import Button from "./Button";
import { paths } from "@/constants/paths";
import PageWrapper from "./PageWrapper";

const SiteDescription = () => {
  return (
    <PageWrapper classNames="bg-gray-900 py-12 flex flex-col-reverse md:flex-row justify-between gap-6 lg:gap-12">
      <div className="flex flex-col justify-center">
        <h3 className="text-center md:text-right text-3xl lg:text-5xl text-grass-20">
          Odkryj interaktywną mapę, która otwiera przed Tobą świat futbolowych
          możliwości!
        </h3>
        <p className="text-center md:text-right md:text-xl mt-6">
          Znajdziesz tutaj wszystkie najważniejsze informacje o turniejach,
          ligach szóstek, szkółkach piłkarskich dla dzieci, boiskach do
          wynajęcia oraz usługach piłkarskich.{" "}
          <span className="text-grass-50">
            Sprawdź, co dzieje się w Twojej okolicy i dołącz do gry!
          </span>
        </p>
        <div className="flex items-end gap-8 mx-auto md:ml-auto md:mr-0">
          <Button
            asLink
            href={paths.Map}
            text="Sprawdź!"
            size="lg"
            classNames="md:ml-auto mt-8 animate-shake"
          />
          <Button
            asLink
            size="lg"
            href={paths.EventAdd}
            text="Dodaj punkt!"
            classNames="mt-8 animate-shake bg-red-400 delay-1"
          />
        </div>
      </div>
      <Image
        src="/images/map-overview.png"
        alt="overview"
        priority
        width={1920}
        height={1080}
        className="h-full w-5/6 md:w-2/3 mx-auto md:mr-auto md:ml-0"
        style={{
          maxHeight: "600px",
          height: "auto",
          objectFit: "cover",
        }}
      />
    </PageWrapper>
  );
};

export default SiteDescription;
