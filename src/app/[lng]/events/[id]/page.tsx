import { PageWrapper, PageContainer } from "@/components/atoms/";
import { Back, EventPreview, NotFound } from "@/components/molecules";
import { mockedEvents } from "@/constants/mocks";

const EventPage = ({ params }: { params: { id: string } }) => {
  const eventData = mockedEvents.find((event) => event.id === params.id);
  return (
    <PageContainer>
      <PageWrapper classNames="grow flex flex-col">
        {eventData ? (
          <EventPreview eventData={eventData}>
            <div className="mx-auto w-max">
              <Back />
            </div>
          </EventPreview>
        ) : (
          <NotFound is404={false} classNames="h-full" />
        )}
      </PageWrapper>
    </PageContainer>
  );
};

export default EventPage;
