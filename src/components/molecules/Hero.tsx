'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Button from '../atoms/Button';
import { paths } from '@/constants/paths';
import { useTranslation } from '@/app/i18n/client';

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

  return (
    <>
      <Head>
        <link rel='preload' as='image' href='/images/football-pitch.jpg' />
      </Head>
      <h1 className='px-8 md:max-w-screen-lg mx-auto text-base md:text-2xl text-grass-30 mb-6 text-center'>
        {t('hero.launchAnnouncement')}
      </h1>
      <div className='relative aspect-video bg-[url("/images/football-pitch.jpg")] bg-cover max-w-screen-2xl w-full mx-auto 2xl:rounded-lg'>
        <div className='absolute inset-0 '>
          <div className='w-full h-full bg-gray-900 opacity-80 hero-clip-diagonal relative' />
          <div
            className='absolute left-[38%] md:left-[55%] top-0 w-3/5 md:w-2/5 h-full flex flex-col justify-center items-center transition-opacity duration-500'
            style={{ opacity: textOpacity }}
          >
            <p
              className='text-grass-20'
              style={{ fontSize: 'clamp(1.2rem, 3vw, 4rem)' }}
            >
              {heroTexts[currentTextIndex]}
            </p>
            <Button
              asLink
              size='lg'
              href={`/${lng}${paths.Map}`}
              text={buttonTitle}
              classNames='mt-8 mr-auto animate-shake'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
