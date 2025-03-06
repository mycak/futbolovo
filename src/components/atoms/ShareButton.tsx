'use client';

import React, { useState } from 'react';
import Button from './Button';
import { useTranslation } from '@/app/i18n/client';

interface ShareButtonProps {
  title?: string;
  text?: string;
  url: string;
  lng: string;
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  text,
  url,
  lng,
  className = '',
}) => {
  const { t } = useTranslation(lng);
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (!navigator.share) {
      console.log('Web Share API not supported in your browser');
      return;
    }

    setIsSharing(true);
    try {
      await navigator.share({
        title,
        text,
        url,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Button
      icon='share-nodes'
      variant='icon'
      color='bg-grass-45'
      onClick={handleShare}
      text={t('share')}
      classNames={`h-[38px] md:text-xl pl-3 pr-5 shrink-0 ${className}`}
      disabled={isSharing}
    />
  );
};

export default ShareButton;
