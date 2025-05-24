import React from 'react';
import { paths } from '@/constants/paths';
import { translate } from '@/app/i18n';
import PageWrapper from '../atoms/PageWrapper';
import Button from '../atoms/Button';

const AddPlaceSection = async ({ lng }: { lng: string }) => {
  const { t } = await translate(lng);

  return (
    <PageWrapper>
      <div className='mx-auto max-w-max'>
        <i className='fa-solid fa-map-location-dot fa-5x text-ivory-150 mx-auto' />
      </div>
      <h3 className='text-3xl md:text-5xl text-center text-grass-20 mt-4 md:mt-8'>
        {t('addPlace.title')}
      </h3>
      <Button
        asLink
        size='lg'
        href={paths.EventAdd}
        classNames='mt-4 md:mt-8 mx-auto block animate-shake hover:animate-none w-max'
        text={t('addPlace.addPlaceButton')}
      />
      <p className='text-center text-ivory-150-60 text-lg md:text-2xl mt-4 md:mt-8'>
        {t('addPlace.text1')}{' '}
        <span className='text-grass-50'>{t('addPlace.text2')}</span>
      </p>
    </PageWrapper>
  );
};

export default AddPlaceSection;
