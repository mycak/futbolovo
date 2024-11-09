import { getEventById } from '@/app/actions';
import { PageWrapper, PageContainer } from '@/components/atoms/';
import { Back, EventPreview, NotFound } from '@/components/molecules';

const EventPage = async ({
  params,
}: {
  params: { id: string; lng: string };
}) => {
  const eventData = await getEventById(params.id);
  return (
    <PageContainer>
      <PageWrapper classNames='grow flex flex-col'>
        {eventData ? (
          <EventPreview eventData={eventData} lng={params.lng} isEventPage>
            <div className='mx-auto w-max'>
              <Back lng={params.lng} />
            </div>
          </EventPreview>
        ) : (
          <NotFound is404={false} classNames='h-full' lng={params.lng} />
        )}
      </PageWrapper>
    </PageContainer>
  );
};

export default EventPage;
