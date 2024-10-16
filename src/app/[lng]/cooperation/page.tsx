import { PageContainer, PageWrapper } from "@/components/atoms/";

import { Back } from "@/components/molecules";
import { contactEmail } from "@/constants/common";

const CooperationPage = () => {
  return (
    <PageContainer>
      <PageWrapper>
        <div className='md:aspect-video md:bg-[url("/images/football-pitch.jpg")] bg-cover max-w-screen-2xl mx-auto rounded-lg'>
          <div className="h-full inset-0 md:bg-gray-900 opacity-[97%] rounded-lg flex flex-col justify-around">
            <div className="text-center text-white flex flex-col items-center">
              <div className="mx-auto max-w-max">
                <i className="fa-solid fa-user-group fa-6x text-ivory-150 mx-auto" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-center text-grass-20 mt-4 md:mt-8">
                Chcesz nawiązać współpracę?{" "}
              </h1>
              <p className="max-w-xl text-lg md:text-xl mt-4">
                Chciałbyś <span className="text-grass-50">zareklamować</span>{" "}
                swoją firmę lub produkt na naszej platformie? A może masz
                pomysł, jak razem możemy{" "}
                <span className="text-grass-50">rozwijać</span> naszą stronę i
                tworzyć nowe, innowacyjne rozwiązania? Jesteśmy również otwarci
                na <span className="text-grass-50">współpracę z patronami</span>
                , którzy chcieliby wesprzeć naszą działalność i stać się częścią
                naszego rozwoju. Skontaktuj się z nami i omówmy możliwości
                wspólnej współpracy!
              </p>
              <div className="text-xl flex flex-col gap-2 mt-4 md:mt-8">
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-envelope text-grass-50" />
                  <a
                    href="mailto:p.myszkiewicz@interia.pl"
                    className="underline"
                  >
                    {" "}
                    {contactEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Back classNames="mx-auto mt-8" />
      </PageWrapper>
    </PageContainer>
  );
};

export default CooperationPage;
