'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Button from '../atoms/Button';
import { paths } from '@/constants/paths';
import { useTranslation } from '@/app/i18n/client';
import clsx from 'clsx';
import { Trans } from 'react-i18next/TransWithoutContext';
import { TFunction } from 'i18next';
import { useRouter } from 'next/navigation';

const Hero = ({
  heroTexts,
  lng,
  buttonTitle,
}: {
  heroTexts: string[];
  lng: string;
  buttonTitle: string;
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [textOpacity, setTextOpacity] = useState<number>(1);
  const CHANGE_TEXT_INTERVAL = 9000;
  const { t } = useTranslation(lng);
  const router = useRouter();

  useEffect(() => {
    // Change the text every n seconds
    const interval = setInterval(() => {
      setTextOpacity(0);
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % heroTexts.length);
        setTextOpacity(1);
      }, 500);
    }, CHANGE_TEXT_INTERVAL);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const textStyle = 'text-base md:text-xl text-green-200';
  return (
    <>
      <Head>
        <link rel='preload' as='image' href='/images/football-pitch.jpg' />
      </Head>
      <div className='flex flex-col items-center justify-center'>
        <div className='bg-gray-900 border-l-4 border-green-500 p-4 mb-6 w-full max-w-screen-lg rounded-r-lg shadow-md'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <i className='fa-solid fa-circle-check text-green-400' />
            </div>
            <div className='ml-3'>
              <h1 className='text-3xl font-medium text-green-300 mb-2'>
                {t('hero.successUpdate')} - 20.07.25
              </h1>
              <p className={textStyle}>
                <Trans
                  i18nKey='hero.marchAnnouncement'
                  t={t as TFunction<'translation', undefined>}
                  components={{
                    panel: <span className='text-grass-50 font-bold' />,
                  }}
                />
              </p>
            </div>
          </div>
          <ul className='list-disc list-inside ml-8 mt-3'>
            <li className={clsx(textStyle, 'text-ivory-150')}>
              {t('hero.marchAnnouncementPoints.point2')}
            </li>
            <li className={clsx(textStyle, 'text-ivory-150')}>
              {t('hero.marchAnnouncementPoints.point1')}
            </li>
            <li className={clsx(textStyle, 'text-ivory-150')}>
              {t('hero.marchAnnouncementPoints.point3')}
            </li>
            <li className={clsx(textStyle, 'text-ivory-150')}>
              {t('hero.marchAnnouncementPoints.point4')}
            </li>
          </ul>
        </div>
      </div>
      <div className='relative aspect-video bg-[url("/images/football-pitch.jpg")] bg-cover max-w-screen-2xl w-full mx-auto 2xl:rounded-lg'>
        <div className='absolute inset-0 '>
          <div className='w-full h-full bg-gray-900 opacity-80 hero-clip-diagonal relative' />
          <div
            className='absolute left-[38%] md:left-[55%] top-0 w-3/5 md:w-2/5 h-full flex flex-col justify-center items-center transition-opacity duration-500'
            style={{ opacity: textOpacity }}
          >
            <p
              className={clsx(
                'text-grass-20',
                currentTextIndex === 0
                  ? 'text-[clamp(1rem,2vw,4rem)] sm:text-[clamp(1.2rem,3vw,4rem)]'
                  : 'text-[clamp(1.2rem,3vw,4rem)]'
              )}
            >
              {heroTexts[currentTextIndex]}
            </p>
            <Button
              onClick={() => router.push(paths.Map)}
              size='lg'
              text={buttonTitle}
              classNames='mt-8 mr-auto animate-shake hover:animate-none'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
