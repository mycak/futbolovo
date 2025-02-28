import { translate } from '@/app/i18n';
import PageContainer from '@/components/atoms/PageContainer';
import PageWrapper from '@/components/atoms/PageWrapper';
import Back from '@/components/molecules/Back';
import AddEventWizard from '@/components/organism/AddEventWizard/AddEventWizard';
import { Metadata } from 'next';
import Head from 'next/head';

export async function generateMetadata(props: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  const { lng } = params;

  const { t } = await translate(lng);
  return {
    title: t('metatags.events.title'),
    description: t('metatags.events.description'),
  };
}

const AddEventPage = async (props: {
  params: Promise<{
    lng: string;
  }>;
}) => {
  const params = await props.params;
  const { t } = await translate(params.lng);

  return (
    <>
      <Head>
        <link rel='canonical' href='https://futbolovo.net/pl/events/add' />
      </Head>
      <PageContainer>
        <PageWrapper>
          <div className='md:bg-gray-900 py-8 sm:px-4 md:px-8 mx-auto rounded-sm w-full'>
            <div className='mx-auto max-w-max'>
              <i className='fa-solid fa-map-location-dot fa-5x text-ivory-150 mx-auto' />
            </div>
            <h2 className='text-2xl md:text-3xl text-center text-grass-20 mt-4 md:mt-8'>
              {t('navigation.editEvent')}
            </h2>
            <AddEventWizard />
          </div>
          <Back classNames='mx-auto mt-8' lng={params.lng} />
        </PageWrapper>
      </PageContainer>
    </>
  );
};

export default AddEventPage;
