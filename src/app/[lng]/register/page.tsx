import { Metadata } from 'next';
import { languages, fallbackLng } from '../../i18n/settings';
import { translate } from '../../i18n';
import PageContainer from '@/components/atoms/PageContainer';
import RegisterForm from '@/components/organism/Auth/RegisterForm';
import PageWrapper from '@/components/atoms/PageWrapper';
import Back from '@/components/molecules/Back';
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

export default async function RegisterPage(props: {
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
        <div className='md:bg-gray-900 py-8 sm:px-4 md:px-8 mx-auto rounded-sm w-full'>
          <div className='mx-auto max-w-max'>
            <i className='fa-solid fa-users-line fa-5x text-ivory-150 mx-auto' />
          </div>
          <h2 className='text-2xl md:text-3xl text-center text-grass-20 mt-4 md:mt-8'>
            {t('auth.userRegistration')}
          </h2>
          <RegisterForm />
          <p className='text-center mt-6 text-grass-20'>
            {t('auth.haveAccount')}{' '}
            <Link
              href={paths.Login}
              className='text-ivory-150 hover:text-ivory-100 transition-colors'
            >
              {t('auth.signIn')}
            </Link>
          </p>
        </div>
        <Back classNames='mx-auto mt-8' lng={params.lng} />
      </PageWrapper>
    </PageContainer>
  );
}
