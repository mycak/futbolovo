import { getEventById } from '@/app/actions';
import PageContainer from '@/components/atoms/PageContainer';
import PageWrapper from '@/components/atoms/PageWrapper';
import Back from '@/components/molecules/Back';
import EventPreview from '@/components/molecules/Events/EventPreview';
import NotFound from '@/components/molecules/NotFound';

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
