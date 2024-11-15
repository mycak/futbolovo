import { translate } from '@/app/i18n';
import PageContainer from '@/components/atoms/PageContainer';
import PageWrapper from '@/components/atoms/PageWrapper';
import Back from '@/components/molecules/Back';
import AddEventWizard from '@/components/organism/AddEventWizard/AddEventWizard';
import { Metadata } from 'next';

export async function generateMetadata({
  params: { lng },
}: {
  params: { lng: string };
}): Promise<Metadata> {
  const { t } = await translate(lng);
  return {
    title: t('metatags.events.title'),
    description: t('metatags.events.description'),
  };
}

const AddEventPage = async ({
  params,
}: {
  params: {
    lng: string;
  };
}) => {
  const { t } = await translate(params.lng);

  return (
    <PageContainer>
      <PageWrapper>
        <div className='md:bg-gray-900 py-8 sm:px-4 md:px-8 mx-auto rounded-sm w-full'>
          <div className='mx-auto max-w-max'>
            <i className='fa-solid fa-map-location-dot fa-5x text-ivory-150 mx-auto' />
          </div>
          <h2 className='text-2xl md:text-3xl text-center text-grass-20 mt-4 md:mt-8'>
            {t('navigation.addPoint')}
          </h2>
          <AddEventWizard lng={params.lng} />
        </div>
        <Back classNames='mx-auto mt-8' lng={params.lng} />
      </PageWrapper>
    </PageContainer>
  );
};

export default AddEventPage;
