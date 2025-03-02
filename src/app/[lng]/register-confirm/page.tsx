import { Metadata } from 'next';
import { languages, fallbackLng } from '../../i18n/settings';
import { translate } from '../../i18n';
import PageContainer from '@/components/atoms/PageContainer';
import PageWrapper from '@/components/atoms/PageWrapper';
import Back from '@/components/molecules/Back';
import { paths } from '@/constants/paths';
import Button from '@/components/atoms/Button';
import SEOCanonical from '@/components/molecules/SEOCanonical';

export async function generateMetadata(props: {
  params: Promise<{
    lng: string;
  }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { lng } = params;

  const { t } = await translate(lng);
  return {
    title: t('metatags.registerConfirm.title'),
    description: t('metatags.registerConfirm.description'),
  };
}

export default async function RegisterConfirmPage(props: {
  params: Promise<{
    lng: string;
  }>;
}) {
  const params = await props.params;
  let { lng } = params;
  const { t } = await translate(lng);

  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  return (
    <>
      <SEOCanonical path={paths.RegisterConfirm} />
      <PageContainer classNames='pb-0'>
        <PageWrapper>
          <div className='md:bg-gray-900 py-8 sm:px-4 md:px-8 mx-auto rounded-sm w-full'>
            <div className='mx-auto max-w-max'>
              <i className='fa-solid fa-users-line fa-5x text-ivory-150 mx-auto' />
            </div>

            <div className='flex flex-col items-center justify-center gap-6 my-8'>
              <div className='text-center'>
                <h3 className='text-xl text-grass-20 mb-2'>
                  {t('auth.registerSuccess.title')}
                </h3>
                <p className='text-grass-20'>
                  {t('auth.registerSuccess.message')}
                </p>
              </div>
              <Button
                text={t('auth.signIn')}
                asLink
                href={paths.Login}
                classNames='h-[38px] text-xl max-w-max'
                color='bg-red-500'
              />
            </div>
          </div>
          <Back classNames='mx-auto mt-8' lng={params.lng} />
        </PageWrapper>
      </PageContainer>
    </>
  );
}
