"use client";

import { PageWrapper, PageContainer } from "@/components/atoms/";
import { Back, EventPreview, NotFound } from "@/components/molecules";
import { mockedEvents } from "@/constants/mocks";

const EventPage = ({ params }: { params: { id: string; lng: string } }) => {
  const eventData = mockedEvents.find((event) => event.id === params.id);
  return (
    <PageContainer>
      <PageWrapper classNames="grow flex flex-col">
        {eventData ? (
          <EventPreview eventData={eventData} lng={params.lng}>
            <div className="mx-auto w-max">
              <Back lng={params.lng} />
            </div>
          </EventPreview>
        ) : (
          <NotFound is404={false} classNames="h-full" lng={params.lng} />
        )}
      </PageWrapper>
    </PageContainer>
  );
};

export default EventPage;
