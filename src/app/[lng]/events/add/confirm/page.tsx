'use client';

import { useTranslation } from '@/app/i18n/client';
import DynamicLoader from '@/components/atoms/DynamicLoader';
import PageContainer from '@/components/atoms/PageContainer';
import PageWrapper from '@/components/atoms/PageWrapper';
import AddEventConfirm from '@/components/organism/AddEventWizard/AddEventConfirm';
import { useParams } from 'next/navigation';
import { Suspense } from 'react';

const AddEventConfirmPage = () => {
  const { lng } = useParams();
  const { t } = useTranslation(lng as string);

  return (
    <PageContainer>
      <PageWrapper>
        <div className='bg-gray-900 py-8 px-8 mx-auto max-w-max rounded-sm'>
          <div className='mx-auto max-w-max'>
            <i className='fa-solid fa-map-location-dot fa-5x text-ivory-150 mx-auto' />
          </div>
          <Suspense fallback={<DynamicLoader classNames='my-16' />}>
            <AddEventConfirm t={t} />
          </Suspense>
        </div>
      </PageWrapper>
    </PageContainer>
  );
};

export default AddEventConfirmPage;
