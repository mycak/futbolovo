'use client';

import { useTranslation } from '@/app/i18n/client';
import clsx from 'clsx';

const Loader = ({ lng, small }: { lng: string; small?: boolean }) => {
  const { t } = useTranslation(lng);

  return (
    <div className='mx-auto text-center pt-24'>
      <i
        className={clsx(
          small ? 'fa-3x' : 'fa-5x',
          'fa-regular fa-futbol text-ivory-150 mx-auto animate-fallAndBounce'
        )}
      />
      <p
        className={clsx(small ? 'text-base' : 'text-2xl', 'mt-4 text-grass-50')}
      >
        {t('wait')}...
      </p>
    </div>
  );
};

export default Loader;
