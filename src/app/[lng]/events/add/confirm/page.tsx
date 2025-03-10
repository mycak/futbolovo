import DynamicLoader from '@/components/atoms/DynamicLoader';
import PageContainer from '@/components/atoms/PageContainer';
import PageWrapper from '@/components/atoms/PageWrapper';
import SEOCanonical from '@/components/molecules/SEOCanonical';
import AddEventConfirm from '@/components/organisms/AddEventWizard/AddEventConfirm';
import { paths } from '@/constants/paths';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { translate } from '@/app/i18n';

export async function generateMetadata(props: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { lng } = params;

  const { t } = await translate(lng);
  return {
    title: t('metatags.eventAddConfirm.title'),
    description: t('metatags.eventAddConfirm.description'),
  };
}

const AddEventConfirmPage = async () => {
  return (
    <>
      <SEOCanonical path={paths.EventAddConfirm} />
      <PageContainer>
        <PageWrapper>
          <div className='bg-gray-900 py-8 px-4 md:px-8 mx-auto max-w-max rounded-sm'>
            <div className='mx-auto max-w-max'>
              <i className='fa-solid fa-map-location-dot fa-5x text-ivory-150 mx-auto' />
            </div>
            <Suspense fallback={<DynamicLoader classNames='my-16' />}>
              <AddEventConfirm />
            </Suspense>
          </div>
        </PageWrapper>
      </PageContainer>
    </>
  );
};

export default AddEventConfirmPage;
