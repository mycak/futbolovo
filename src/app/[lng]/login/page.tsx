import { Metadata } from 'next';
import { languages, fallbackLng } from '../../i18n/settings';
import { translate } from '../../i18n';
import PageContainer from '@/components/atoms/PageContainer';
import PageWrapper from '@/components/atoms/PageWrapper';
import Back from '@/components/molecules/Back';
import LoginForm from '@/components/organism/Auth/LoginForm';
import Link from 'next/link';
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
    title: t('metatags.home.title'),
    description: t('metatags.home.description'),
  };
}

export default async function LoginPage(props: {
  params: Promise<{
    lng: string;
  }>;
}) {
  const params = await props.params;

  let { lng } = params;
  const { t } = await translate(lng);

  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  return (
    <PageContainer classNames='pb-0'>
      <PageWrapper>
        <div className='md:bg-gray-900 py-8 sm:px-4 md:px-8 mx-auto rounded-sm'>
          <div className='mx-auto max-w-max'>
            <i className='fa-solid fa-user fa-5x text-ivory-150 mx-auto' />
          </div>
          <h2 className='text-2xl md:text-3xl text-center text-grass-20 mt-4 md:mt-8'>
            {t('auth.userLogin')}
          </h2>
          <LoginForm />
          <p className='text-center mt-6 text-grass-20'>
            {t('auth.noAccount')}{' '}
            <Link
              href={paths.Register}
              className='text-ivory-150 hover:text-grass-50 transition-colors'
            >
              {t('auth.signUp')}
            </Link>
          </p>
          {/* //TODO: finish reset page */}
          {/* <p className='text-center mt-2 text-grass-20'>
            {t('auth.forgotPassword')}{' '}
            <Link
              href={paths.PasswordReset}
              className='text-ivory-150 hover:text-grass-50 transition-colors'
            >
              {t('auth.resetPassword')}
            </Link>
          </p> */}
        </div>
        <Back classNames='mx-auto mt-8' lng={params.lng} />
      </PageWrapper>
    </PageContainer>
  );
}
