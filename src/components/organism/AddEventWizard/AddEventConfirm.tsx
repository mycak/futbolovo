'use client';
import { paths } from '@/constants/paths';
import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useAddEventWizardStore } from '@/stores';
import { TFunction } from 'i18next';
import Loader from '@/components/atoms/Loader';
import Button from '@/components/atoms/Button';

const AddEventConfirm = ({ t }: { t: TFunction<'translation', undefined> }) => {
  const params = useSearchParams();
  const urlParams = useParams();

  const clearState = useAddEventWizardStore((state) => state.clearState);

  const endDate = params.get('endDate');
  const email = params.get('email');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => clearState(), []);

  if (!endDate && !email) return <Loader lng={urlParams.lng as string} />;

  return (
    <div>
      <h1 className='mt-4 md:mt-8 text-2xl md:text-3xl font-bold text-center text-grass-50 mb-6'>
        {t('eventConfirmation.title')}
      </h1>
      <div className='max-w-80 mx-auto'>
        <p className='text-center'>{t('eventConfirmation.text1')}</p>
        <p className='text-center py-4'>
          {t('eventConfirmation.endDateText')}{' '}
          <span className='text-grass-40'>{endDate}</span>
        </p>
        <p className='text-center'>{t('eventConfirmation.text2')}</p>
        <p className='text-center text-xl text-grass-50 pt-4'>Stay tuned!</p>
      </div>
      <div className='flex flex-col justify-center mt-8 gap-4'>
        <div className='flex items-center gap-4 justify-center'>
          <Button
            classNames='h-[38px] md:text-xl bg-grass-45'
            variant='icon'
            icon='plus'
            text={t('eventConfirmation.addNext')}
            asLink
            href={paths.EventAdd}
          />
          <Button
            classNames='h-[38px] md:text-xl bg-grass-45'
            variant='icon'
            icon='plus'
            text={t('eventConfirmation.addSimilar')}
            asLink
            href={`${paths.EventAdd}?data=repeated`}
          />
        </div>
        <Button
          classNames='h-[38px] bg-red-400 w-max mx-auto md:text-xl'
          text={t('eventConfirmation.end')}
          variant='icon'
          icon='map'
          asLink
          href={paths.Map}
        />
      </div>
    </div>
  );
};

export default AddEventConfirm;
