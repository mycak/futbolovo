import { translate } from '@/app/i18n';
import PageContainer from '@/components/atoms/PageContainer';
import PageWrapper from '@/components/atoms/PageWrapper';
import Back from '@/components/molecules/Back';
import { contactEmail } from '@/constants/common';
import { Metadata } from 'next';
import { paths } from '@/constants/paths';
import SEOMetadata from '@/components/molecules/SEOMetadata';

export async function generateMetadata(props: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  const { lng } = params;

  const { t } = await translate(lng);
  return {
    title: t('metatags.statute.title'),
    description: t('metatags.statute.description'),
  };
}

const StatutePage = async (props: {
  params: Promise<{
    lng: string;
  }>;
}) => {
  const params = await props.params;
  const { t } = await translate(params.lng);
  const pointTitleClassName = 'text-grass-50 my-2 ';
  return (
    <>
      <SEOMetadata t={t} path={paths.Statute} />
      <PageContainer>
        <PageWrapper>
          <div className='max-w-screen-xl mx-auto rounded-lg bg-gray-900 flex flex-col justify-around py-8 px-4 md:py-12'>
            <div className='text-center text-white flex flex-col items-center'>
              <h1 className='text-3xl md:text-4xl lg:text-5xl text-center text-grass-20'>
                {t('statutePage.title')}
              </h1>
              <div className='max-w-xl mt-4 text-left text-sm md:text-xl'>
                <h2 className={pointTitleClassName}>
                  1. {t('statutePage.responsibilityTitle')}
                </h2>
                <p>{t('statutePage.responsibilityText')}</p>
                <h2 className={pointTitleClassName}>
                  2. {t('statutePage.dataUsageTitle')}
                </h2>
                <p>{t('statutePage.dataUsageText')}</p>
                <h2 className={pointTitleClassName}>
                  3. {t('statutePage.accurateInfoTitle')}
                </h2>
                <p>{t('statutePage.accurateInfoText')}</p>
                <h2 className={pointTitleClassName}>
                  4. {t('statutePage.logoUsageTitle')}
                </h2>
                <p>{t('statutePage.logoUsageText')}</p>
                <h2 className={pointTitleClassName}>
                  5. {t('statutePage.illegalContentTitle')}
                </h2>
                <p>{t('statutePage.illegalContentText')}</p>
                <h2 className={pointTitleClassName}>
                  6. {t('statutePage.dataVerificationTitle')}
                </h2>
                <p>{t('statutePage.dataVerificationText')}</p>
                <h2 className={pointTitleClassName}>
                  7. {t('statutePage.complaintsTitle')}
                </h2>
                <p>{t('statutePage.complaintsText')}</p>
                <h2 className={pointTitleClassName}>
                  8. {t('statutePage.changesTitle')}
                </h2>
                <p>{t('statutePage.changesText')}</p>
                <h2 className={pointTitleClassName}>
                  9. {t('statutePage.contactTitle')}
                </h2>
                <p>
                  {t('statutePage.contactText')}
                  <a
                    href={`mailto:${contactEmail}`}
                    className='underline text-grass-40'
                  >
                    {contactEmail}
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
          <Back lng={params.lng} classNames='mx-auto mt-8' />
        </PageWrapper>
      </PageContainer>
    </>
  );
};
export default StatutePage;
