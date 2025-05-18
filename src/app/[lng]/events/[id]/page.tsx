import { getEventById } from '@/app/actions/events';
import { translate } from '@/app/i18n';
import { generateEventSchema } from '@/utils/jsonld.utils';
import PageContainer from '@/components/atoms/PageContainer';
import PageWrapper from '@/components/atoms/PageWrapper';
import Back from '@/components/molecules/Back';
import EventPreview from '@/components/molecules/Events/EventPreview';
import NotFound from '@/components/molecules/NotFound';
import SEOMetadata from '@/components/molecules/SEOMetadata';
import { paths } from '@/constants/paths';
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

export async function generateMetadata(props: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  const { lng } = params;

  const { t } = await translate(lng);
  return {
    title: t('metatags.event.title'),
    description: t('metatags.event.description'),
  };
}

const EventPage = async (props: {
  params: Promise<{ id: string; lng: string }>;
}) => {
  const queryClient = new QueryClient();
  const params = await props.params;
  const { t } = await translate(params.lng);

  const eventData = await queryClient.fetchQuery({
    queryKey: ['event', params.id],
    queryFn: () => getEventById(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SEOMetadata
        path={paths.Event(params.id)}
        t={t}
        jsonLd={eventData ? generateEventSchema(eventData, t) : undefined}
      />
      <PageContainer>
        <PageWrapper classNames='grow flex flex-col'>
          {eventData ? (
            <div className='sm:bg-gray-900 rounded-lg sm:py-8 md:px-8 mx-4'>
              <EventPreview eventData={eventData} lng={params.lng} isEventPage>
                <div className='mx-auto w-max'>
                  <Back lng={params.lng} />
                </div>
              </EventPreview>
            </div>
          ) : (
            <NotFound is404={false} classNames='h-full' lng={params.lng} />
          )}
        </PageWrapper>
      </PageContainer>
    </HydrationBoundary>
  );
};

export default EventPage;
