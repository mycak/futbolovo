import { getEventsByUser } from '@/app/actions/events';
import { translate } from '@/app/i18n';
import PageContainer from '@/components/atoms/PageContainer';
import PageWrapper from '@/components/atoms/PageWrapper';
import Back from '@/components/molecules/Back';
import NotFound from '@/components/molecules/NotFound';
import MyEventsList from '@/components/organisms/Events/MyEventsList';
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/configs/auth';
import SEOCanonical from '@/components/molecules/SEOCanonical';
import { paths } from '@/constants/paths';

export async function generateMetadata(props: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { lng } = params;

  const { t } = await translate(lng);
  return {
    title: t('metatags.myEvents.title'),
    description: t('metatags.myEvents.description'),
  };
}

const MyEventsPage = async (props: {
  params: Promise<{ id: string; lng: string }>;
}) => {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);
  const { lng } = await props.params;
  const { t } = await translate(lng);

  if (!session || !session.user) {
    return <NotFound is404={false} classNames='h-full' lng={lng} />;
  }

  const { user } = session;

  const eventsData = await queryClient.fetchQuery({
    queryKey: ['my-events', user.id],
    queryFn: () => getEventsByUser(user.id, user.email),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SEOCanonical path={paths.MyEvents} />

      <PageContainer>
        <PageWrapper classNames='grow flex flex-col'>
          <div className='sm:bg-gray-900 sm:p-5 rounded-lg py-8 md:px-8 mx-4'>
            <div className='mx-auto max-w-max'>
              <i className='fa-solid fa-futbol fa-6x text-ivory-150 mx-auto' />
            </div>
            <h1 className='text-3xl md:text-4xl lg:text-5xl text-center text-grass-20 mb-6 mt-4 md:mt-8'>
              {t('myList')}
            </h1>
            <MyEventsList events={eventsData} lng={lng} />
            <div className='mx-auto w-max mt-8'>
              <Back lng={lng} />
            </div>
          </div>
        </PageWrapper>
      </PageContainer>
    </HydrationBoundary>
  );
};

export default MyEventsPage;
