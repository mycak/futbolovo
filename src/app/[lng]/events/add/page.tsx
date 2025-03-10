import { translate } from '@/app/i18n';
import PageContainer from '@/components/atoms/PageContainer';
import PageWrapper from '@/components/atoms/PageWrapper';
import Back from '@/components/molecules/Back';
import AddEventWizard from '@/components/organism/AddEventWizard/AddEventWizard';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import Button from '@/components/atoms/Button';
import { paths } from '@/constants/paths';
import { authOptions } from '@/configs/auth';
import SEOCanonical from '@/components/molecules/SEOCanonical';
import { Suspense } from 'react';
import DynamicLoader from '@/components/atoms/DynamicLoader';

export async function generateMetadata(props: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { lng } = params;

  const { t } = await translate(lng);
  return {
    title: t('metatags.eventAdd.title'),
    description: t('metatags.eventAdd.description'),
  };
}

const AddEventPage = async (props: {
  params: Promise<{
    lng: string;
  }>;
}) => {
  const params = await props.params;
  const { t } = await translate(params.lng);

  const session = await getServerSession(authOptions);

  return (
    <>
      <SEOCanonical path={paths.EventAdd} />
      <PageContainer>
        <PageWrapper>
          <div className='md:bg-gray-900 md:py-8 sm:px-4 md:px-8 mx-auto rounded-sm w-full'>
            <div className='mx-auto max-w-max'>
              <i className='fa-solid fa-map-location-dot fa-5x text-ivory-150 mx-auto' />
            </div>
            <h2 className='text-2xl md:text-3xl text-center text-grass-20 mt-4 md:mt-8'>
              {t('navigation.addPoint')}
            </h2>
            {!session || !session.user ? (
              <Button
                asLink
                href={paths.Login}
                size='lg'
                text={`${t('auth.login')} / ${t('auth.register')}`}
                color='bg-red-600'
                classNames='mt-4 mb-5 md:mt-8 mx-auto'
              />
            ) : null}
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
