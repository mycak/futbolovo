'use client';

import React, { FC } from 'react';
import clsx from 'clsx';
import Divider from '../atoms/Divider';
import Button from '../atoms/Button';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onAccept: () => void;
}

const Modal: FC<ModalProps> = ({ children, isOpen, title, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80'
      )}
    >
      <div className={clsx('bg-gray-900 rounded-sm p-4 w-max max-w-lg')}>
        <h2 className='text-2xl text-center font-bold mb-4 text-grass-20 '>
          {title}
        </h2>
        <Divider contained />
        <div className='max-h-[40vh] overflow-auto scrollbar-grass pr-2'>
          {children}
        </div>
        <Divider contained />

        <div className='flex justify-center gap-4 mt-4'>
          <Button text='Ok' onClick={onAccept} classNames='bg-grass-40' />
        </div>
      </div>
    </div>
  );
};

export default Modal;
