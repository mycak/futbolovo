import { Metadata } from 'next';
import { translate } from '@/app/i18n';
import PageContainer from '@/components/atoms/PageContainer';
import PageWrapper from '@/components/atoms/PageWrapper';
import Back from '@/components/molecules/Back';

import { contactEmail, contactPhone } from '@/constants/common';
import { Trans } from 'react-i18next/TransWithoutContext';
import { paths } from '@/constants/paths';
import SEOMetadata from '@/components/molecules/SEOMetadata';
import { TFunction } from 'i18next';

export async function generateMetadata(props: {
  params: Promise<{
    lng: string;
  }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { lng } = params;

  const { t } = await translate(lng);
  return {
    title: t('metatags.contact.title'),
    description: t('metatags.contact.description'),
  };
}

export default async function ContactPage(props: {
  params: Promise<{
    lng: string;
  }>;
}) {
  const params = await props.params;
  const { lng } = params;
  const { t } = await translate(lng);

  return (
    <>
      <SEOMetadata t={t} path={paths.Contact} currentLanguage={lng} />
      <PageContainer>
        <PageWrapper>
          <div className='md:aspect-video md:bg-[url("/images/football-pitch.jpg")] bg-cover max-w-screen-2xl mx-auto rounded-lg'>
            <div className='h-full inset-0 md:bg-gray-900 opacity-[97%] rounded-lg flex flex-col justify-around'>
              <div className='text-center text-white flex flex-col items-center'>
                <div className='mx-auto max-w-max'>
                  <i className='fa-solid fa-address-book fa-6x text-ivory-150 mx-auto' />
                </div>
                <h1 className='text-3xl md:text-4xl lg:text-5xl text-center text-grass-20 mt-4 md:mt-8'>
                  {t('contactPage.title')}
                </h1>
                <p className='max-w-xl text-xl mt-4'>
                  <Trans
                    t={t as TFunction<'translation', undefined>}
                    i18nKey='contactPage.text1'
                    components={{
                      1: <span className='text-grass-50' />,
                    }}
                  >
                    Jeśli masz ciekawy
                    <span className='text-grass-50'>pomysł</span>, który może
                    pomóc w rozwoju naszej platformy, napisz do nas!
                    <span className='text-grass-50'>
                      Doświadczasz błędów
                    </span>{' '}
                    na stronie? Jesteśmy tutaj, aby pomóc. Skontaktuj się z
                    nami, a postaramy się rozwiązać problem jak najszybciej.
                  </Trans>
                </p>
                <div className='flex items-center gap-3 mt-4 md:mt-8 mb-2 md:mb-4 text-xl'>
                  <i className='fa-solid fa-phone-flip text-grass-50' />
                  <a href={`tel:${contactPhone.value}`} className='underline'>
                    {' '}
                    {contactPhone.value}
                  </a>
                </div>
                <div className='flex items-center gap-3 text-xl'>
                  <i className='fa-solid fa-envelope text-grass-50' />
                  <a href={`mailto:${contactEmail}`} className='underline'>
                    {contactEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <Back lng={params.lng} classNames='mx-auto mt-8' />
        </PageWrapper>
      </PageContainer>
    </>
  );
}
