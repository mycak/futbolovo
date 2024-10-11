import {
  DashboardHeading,
  PageWrapper,
  Divider,
  PageContainer,
} from "@/components/atoms/";
import { Back, EventPreview, NotFound } from "@/components/molecules";
import { mockedEvents } from "@/constants/mocks";

const EventPage = ({ params }: { params: { id: string } }) => {
  const eventData = mockedEvents.find((event) => event.id === params.id);
  return (
    <PageContainer>
      <DashboardHeading classNames="my-4" />
      <Divider />
      <PageWrapper>
        {eventData ? (
          <EventPreview eventData={eventData}>
            <div className="mx-auto w-max">
              <Back />
            </div>
          </EventPreview>
        ) : (
          <NotFound is404={false} classNames="mt-12" />
        )}
      </PageWrapper>
    </PageContainer>
  );
};

export default EventPage;
