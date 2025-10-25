import { translate } from '@/app/i18n';
import { Metadata } from 'next';
import { getServices } from '@/app/actions/events';
import PageContainer from '@/components/atoms/PageContainer';
import PageWrapper from '@/components/atoms/PageWrapper';
import Back from '@/components/molecules/Back';
import { Trans } from 'react-i18next/TransWithoutContext';
import SEOMetadata from '@/components/molecules/SEOMetadata';
import { paths } from '@/constants/paths';
import { TFunction } from 'i18next';
import ServicesSearch from '../../../components/organisms/ServicesSearch';

export async function generateMetadata(props: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { lng } = params;

  const { t } = await translate(lng);
  return {
    title: t('metatags.services.title'),
    description: t('metatags.services.description'),
  };
}

const ServicesPage = async (props: {
  params: Promise<{
    lng: string;
  }>;
}) => {
  const params = await props.params;
  const { lng } = params;
  const { t } = await translate(lng);
  const services = await getServices();

  return (
    <>
      <SEOMetadata t={t} path={paths.Services} currentLanguage={lng} />
      <PageContainer>
        <PageWrapper>
          <div className='bg-gray-800 max-w-4xl mx-auto rounded-lg py-6 px-4 md:py-8 md:px-8'>
            <div className='text-center text-white flex flex-col items-center'>
              <div className='mx-auto max-w-max'>
                <i className='fa-solid fa-briefcase fa-6x text-ivory-150 mx-auto' />
              </div>
              <h1 className='text-3xl md:text-4xl lg:text-5xl text-center text-grass-20 mt-4 md:mt-8'>
                {t('servicesPage.title')}
              </h1>
              <p className='max-w-4xl text-lg md:text-xl mt-4'>
                <Trans
                  t={t as TFunction<'translation', undefined>}
                  i18nKey='servicesPage.subtitle'
                  components={{
                    1: <span className='text-grass-50' />,
                  }}
                >
                  Discover a wide range of{' '}
                  <span className='text-grass-50'>football services</span> to
                  enhance your game.
                </Trans>
              </p>
            </div>
          </div>

          <ServicesSearch lng={lng} services={services} />

          <Back lng={lng} classNames='mx-auto mt-8' />
        </PageWrapper>
      </PageContainer>
    </>
  );
};

export default ServicesPage;
