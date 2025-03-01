'use client';
import { paths } from '@/constants/paths';
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAddEventWizardStore } from '@/stores';
import { TFunction } from 'i18next';
import Button from '@/components/atoms/Button';
import DynamicLoader from '@/components/atoms/DynamicLoader';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const AddEventConfirm = ({ t }: { t: TFunction<'translation', undefined> }) => {
  const params = useSearchParams();
  const { status } = useSession();

  const clearState = useAddEventWizardStore((state) => state.clearState);

  const endDate = params.get('endDate');
  const email = params.get('email');
  const eventIds = JSON.parse(
    decodeURIComponent(params.get('eventIds') as string)
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => clearState(), []);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const isSignedIn = status === 'authenticated';
  if (!endDate && !email) return <DynamicLoader classNames='mt-4' />;

  return (
    <div>
      <h1 className='mt-4 md:mt-8 text-2xl md:text-3xl font-bold text-center text-grass-50 mb-6'>
        {t('eventConfirmation.title')}
      </h1>
      <div className='max-w-80 mx-auto md:max-w-xl'>
        <p className='text-center'>
          {isSignedIn
            ? t('eventConfirmation.text3')
            : t('eventConfirmation.text2')}
        </p>
        <div className='flex flex-col gap-2 items-center text-center mt-2'>
          {eventIds.map((id: string) => (
            <Link
              href={`${appUrl}/events/${id}`}
              key={id}
              target='_blank'
              className='text-grass-20 text-sm'
            >
              {`${appUrl}/events/${id}`}
            </Link>
          ))}
        </div>
        <p className='text-center py-4'>
          {t('eventConfirmation.endDateText')}{' '}
          <span className='text-grass-40'>{endDate}</span>
        </p>
        <p className='text-center text-xl text-grass-50 pt-4'>Stay tuned!</p>
      </div>
      <div className='flex flex-col justify-center mt-8 gap-4 md:gap-6'>
        <div className='flex items-center gap-4 justify-center flex-wrap md:gap-6'>
          <Button
            classNames='h-[38px] md:text-xl'
            variant='icon'
            icon='plus'
            text={t('eventConfirmation.addNext')}
            asLink
            href={paths.EventAdd}
            color='bg-grass-45'
          />
          <Button
            color='bg-grass-45'
            classNames='h-[38px] md:text-xl'
            variant='icon'
            icon='plus'
            text={t('eventConfirmation.addSimilar')}
            asLink
            href={`${paths.EventAdd}?data=repeated`}
          />
        </div>
        <Button
          classNames='h-[38px] w-max mx-auto md:text-xl'
          color='bg-red-500'
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
