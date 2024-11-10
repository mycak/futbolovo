import { FieldValues, UseFormRegister } from 'react-hook-form';
import clsx from 'clsx';
import React from 'react';

const SwitchInput = ({
  label,
  name,
  register,
  error,
}: {
  label: string | React.ReactNode;
  name: string;
  register: UseFormRegister<FieldValues>;
  error?: string;
}) => {
  return (
    <div className='relative max-w-80 w-full md:w-max md:max-w-full md:col-span-2'>
      <label className='flex items-center '>
        <input
          type='checkbox'
          id={name}
          className={clsx(
            'w-5 h-5 rounded-full bg-emerald-900 border border-grass-50 cursor-pointer',
            'accent-grass-20',
            error && 'border-red-500'
          )}
          {...register(name)}
        />
        <span className='ml-3'>{label}</span>
      </label>
      {error && (
        <span className='absolute text-red-500 text-xs -bottom-4 right-0'>
          {error}
        </span>
      )}
    </div>
  );
};

export default SwitchInput;
