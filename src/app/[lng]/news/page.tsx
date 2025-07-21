import { translate } from '@/app/i18n';
import PageContainer from '@/components/atoms/PageContainer';
import PageWrapper from '@/components/atoms/PageWrapper';
import Back from '@/components/molecules/Back';
import { Metadata } from 'next';
import { Trans } from 'react-i18next/TransWithoutContext';
import SEOMetadata from '@/components/molecules/SEOMetadata';
import { paths } from '@/constants/paths';
import { TFunction } from 'i18next';

export async function generateMetadata(props: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { lng } = params;

  const { t } = await translate(lng);
  return {
    title: t('metatags.news.title'),
    description: t('metatags.news.description'),
  };
}

const NewsPage = async (props: {
  params: Promise<{
    lng: string;
  }>;
}) => {
  const params = await props.params;
  const { t } = await translate(params.lng);

  return (
    <>
      <SEOMetadata
        t={t}
        path={paths.News}
        currentLanguage={params.lng}
      />
      <PageContainer>
        <PageWrapper>
          <div className='md:aspect-video md:bg-[url("/images/football-pitch.jpg")] bg-cover max-w-screen-2xl mx-auto rounded-lg'>
            <div className='h-full inset-0 md:bg-gray-900 opacity-[97%] rounded-lg flex flex-col justify-around'>
              <div className='text-center text-white flex flex-col items-center'>
                <div className='mx-auto max-w-max'>
                  <i className='fa-solid fa-newspaper fa-6x text-ivory-150 mx-auto' />
                </div>
                <h1 className='text-3xl md:text-4xl lg:text-5xl text-center text-grass-20 mt-4 md:mt-8'>
                  {t('newsPage.title')}
                </h1>
                <p className='max-w-xl text-lg md:text-xl mt-4'>
                  <Trans
                    t={t as TFunction<'translation', undefined>}
                    i18nKey='newsPage.text1'
                    components={{
                      1: <span className='text-grass-50' />,
                    }}
                  >
                    Stay updated with the latest <span className='text-grass-50'>football events</span> and news from around the world.
                  </Trans>
                </p>
              </div>
            </div>
          </div>

          {/* News Articles Section */}
          <div className='max-w-4xl mx-auto mt-8'>
            <div className='grid gap-6 md:gap-8'>
              {/* Initial News Article */}
              <article className='bg-gray-800 rounded-lg p-6 border border-gray-700'>
                <div className='flex items-center gap-2 text-sm text-grass-50 mb-3'>
                  <i className='fa-solid fa-calendar-alt' />
                  <time>{t('newsPage.initialNews.date')}</time>
                </div>
                <h2 className='text-xl md:text-2xl font-semibold text-grass-20 mb-4'>
                  {t('newsPage.initialNews.title')}
                </h2>
                <p className='text-ivory-150 leading-relaxed mb-4'>
                  <Trans
                    t={t as TFunction<'translation', undefined>}
                    i18nKey='newsPage.initialNews.content'
                    components={{
                      1: <span className='text-grass-50' />,
                    }}
                  >
                    Welcome to Futbolovo News! This is where you'll find all the latest updates about <span className='text-grass-50'>football events</span>, tournament announcements, and platform updates. Stay tuned for exciting news from the football community!
                  </Trans>
                </p>
                <div className='flex items-center gap-2 text-sm text-gray-400'>
                  <i className='fa-solid fa-tag' />
                  <span>{t('newsPage.initialNews.category')}</span>
                </div>
              </article>

              {/* Placeholder for future news */}
              <div className='text-center py-8 text-gray-400'>
                <i className='fa-solid fa-clock text-2xl mb-2' />
                <p>{t('newsPage.moreNewsComingSoon')}</p>
              </div>
            </div>
          </div>

          <Back lng={params.lng} classNames='mx-auto mt-8' />
        </PageWrapper>
      </PageContainer>
    </>
  );
};

export default NewsPage;