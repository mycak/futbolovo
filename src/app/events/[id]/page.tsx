import {
  PageContainer,
  Loader,
  DashboardHeading,
  PageWrapper,
} from "@/components/atoms/";
import { Back, EventPreview } from "@/components/molecules";
import { mockedEvents } from "@/constants/mocks";

const EventPage = ({ params }: { params: { id: string } }) => {
  const eventData = mockedEvents.find((event) => event.id === params.id);
  return (
    <PageContainer>
      <DashboardHeading classNames="my-4" />
      <PageWrapper>
        {eventData ? (
          <EventPreview eventData={eventData}>
            <div className="mx-auto w-max">
              <Back />
            </div>
          </EventPreview>
        ) : (
          <Loader />
        )}
      </PageWrapper>
    </PageContainer>
  );
};

export default EventPage;
