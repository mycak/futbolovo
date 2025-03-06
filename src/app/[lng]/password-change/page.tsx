import { Metadata } from 'next';
import { languages, fallbackLng } from '../../i18n/settings';
import { translate } from '../../i18n';
import PageContainer from '@/components/atoms/PageContainer';
import PageWrapper from '@/components/atoms/PageWrapper';
import Back from '@/components/molecules/Back';
import ChangePasswordForm from '@/components/organism/Auth/ChangePasswordForm';
import SEOCanonical from '@/components/molecules/SEOCanonical';
import { paths } from '@/constants/paths';

export async function generateMetadata(props: {
  params: Promise<{
    lng: string;
  }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { lng } = params;

  const { t } = await translate(lng);
  return {
    title: t('metatags.passwordChange.title'),
    description: t('metatags.passwordChange.description'),
  };
}

export default async function ChangePasswordPage(props: {
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
      <SEOCanonical path={paths.ChangePassword} />
      <PageContainer classNames='pb-0'>
        <PageWrapper>
          <div className='md:bg-gray-900 md:py-8 sm:px-4 md:px-8 mx-auto rounded-sm'>
            <div className='mx-auto max-w-max'>
              <i className='fa-solid fa-key fa-5x text-ivory-150 mx-auto' />
            </div>
            <h2 className='text-2xl md:text-3xl text-center text-grass-20 mt-4 md:mt-8'>
              {t('auth.changePassword.title')}
            </h2>
            <ChangePasswordForm />
          </div>
          <Back classNames='mx-auto mt-8' lng={params.lng} />
        </PageWrapper>
      </PageContainer>
    </>
  );
}
