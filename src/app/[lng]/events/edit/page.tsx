import { translate } from '@/app/i18n';
import DynamicLoader from '@/components/atoms/DynamicLoader';
import PageContainer from '@/components/atoms/PageContainer';
import PageWrapper from '@/components/atoms/PageWrapper';
import Back from '@/components/molecules/Back';
import SEOMetadata from '@/components/molecules/SEOMetadata';
import AddEventWizard from '@/components/organisms/AddEventWizard/AddEventWizard';
import { paths } from '@/constants/paths';
import { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata(props: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { lng } = params;

  const { t } = await translate(lng);
  return {
    title: t('metatags.eventEdit.title'),
    description: t('metatags.eventEdit.description'),
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
      <SEOMetadata path={paths.EventEdit} t={t} currentLanguage={params.lng} />
      <PageContainer>
        <PageWrapper>
          <div className='md:bg-gray-900 md:py-8 sm:px-4 md:px-8 mx-auto rounded-sm w-full'>
            <div className='mx-auto max-w-max'>
              <i className='fa-solid fa-map-location-dot fa-5x text-ivory-150 mx-auto' />
            </div>
            <h2 className='text-2xl md:text-3xl text-center text-grass-20 mt-4 md:mt-8'>
              {t('navigation.editEvent')}
            </h2>
            <Suspense fallback={<DynamicLoader classNames='my-16' />}>
              <AddEventWizard />
            </Suspense>
          </div>
          <Back classNames='mx-auto mt-8' lng={params.lng} />
        </PageWrapper>
      </PageContainer>
    </>
  );
};

export default AddEventPage;
