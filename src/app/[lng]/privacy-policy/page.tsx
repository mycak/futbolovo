import { translate } from '@/app/i18n';
import PageContainer from '@/components/atoms/PageContainer';
import PageWrapper from '@/components/atoms/PageWrapper';
import Back from '@/components/molecules/Back';
import { contactEmail } from '@/constants/common';
import { Metadata } from 'next';
import Head from 'next/head';

export async function generateMetadata(props: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  const { lng } = params;

  const { t } = await translate(lng);
  return {
    title: t('metatags.privacyPolicy.title'),
    description: t('metatags.privacyPolicy.description'),
  };
}

const PrivacyPolicyPage = async (props: {
  params: Promise<{
    lng: string;
  }>;
}) => {
  const params = await props.params;
  const { t } = await translate(params.lng);
  const pointTitleClassName = 'text-grass-50 my-2 ';
  return (
    <>
      <Head>
        <link rel='canonical' href='https://futbolovo.net/pl/statute' />
      </Head>
      <PageContainer>
        <PageWrapper>
          <div className='max-w-screen-xl mx-auto rounded-lg bg-gray-900 flex flex-col justify-around py-8 px-4 md:py-12'>
            <div className='text-center text-white flex flex-col items-center'>
              <h1 className='text-3xl md:text-4xl lg:text-5xl text-center text-grass-20'>
                {t('privacyPolicyPage.title')}
              </h1>
              <div className='max-w-xl mt-4 text-left text-sm md:text-xl'>
                <h2 className={pointTitleClassName}>
                  1. {t('privacyPolicyPage.adminTitle')}
                </h2>
                <p>
                  {t('privacyPolicyPage.adminText')}{' '}
                  <a
                    href={`mailto:${contactEmail}`}
                    className='underline text-grass-40'
                  >
                    {contactEmail}
                  </a>
                  .
                </p>
                <h2 className={pointTitleClassName}>
                  2. {t('privacyPolicyPage.dataScopeTitle')}
                </h2>
                <p>{t('privacyPolicyPage.dataScopeText')}</p>
                <h2 className={pointTitleClassName}>
                  3. {t('privacyPolicyPage.dataPurposeTitle')}
                </h2>
                <p>{t('privacyPolicyPage.dataPurposeText')}</p>
                <h2 className={pointTitleClassName}>
                  4. {t('privacyPolicyPage.dataSharingTitle')}
                </h2>
                <p>{t('privacyPolicyPage.dataSharingText')}</p>
                <h2 className={pointTitleClassName}>
                  5. {t('privacyPolicyPage.dataSecurityTitle')}
                </h2>
                <p>{t('privacyPolicyPage.dataSecurityText')}</p>
                <h2 className={pointTitleClassName}>
                  6. {t('privacyPolicyPage.userRightsTitle')}
                </h2>
                <p>{t('privacyPolicyPage.userRightsText')}</p>
                <h2 className={pointTitleClassName}>
                  7. {t('privacyPolicyPage.dataRetentionTitle')}
                </h2>
                <p>{t('privacyPolicyPage.dataRetentionText')}</p>
                <h2 className={pointTitleClassName}>
                  8. {t('privacyPolicyPage.policyChangesTitle')}
                </h2>
                <p>{t('privacyPolicyPage.policyChangesText')}</p>
                <h2 className={pointTitleClassName}>
                  9. {t('privacyPolicyPage.contactTitle')}
                </h2>
                <p>{t('privacyPolicyPage.contactText')}</p>
              </div>
            </div>
          </div>
          <Back lng={params.lng} classNames='mx-auto mt-8' />
        </PageWrapper>
      </PageContainer>
    </>
  );
};
export default PrivacyPolicyPage;
