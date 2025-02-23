'use client';
import { Path, UseFormRegister, FieldValues } from 'react-hook-form';
import clsx from 'clsx';

const Checkbox = <T extends FieldValues>({
  label,
  name,
  register,
  error,
  disabled,
}: {
  label: string | React.ReactNode;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
  disabled?: boolean;
}) => {
  return (
    <div className='relative'>
      <label className='flex items-center gap-2 cursor-pointer'>
        <input
          type='checkbox'
          id={name}
          className={clsx(
            'w-5 h-5 border border-grass-50 rounded bg-emerald-950/30',
            'accent-grass-40 hover:accent-grass-40',
            'hover:border-grass-40 focus:border-grass-40 focus:ring-1 focus:ring-grass-40 focus:ring-offset-0',
            disabled && 'opacity-75 cursor-not-allowed',
            error && 'border-red-500 focus:border-red-400 hover:border-red-400'
          )}
          {...register(name)}
          disabled={disabled}
        />
        <span className={clsx('text-grass-20', disabled && 'opacity-75')}>
          {label}
        </span>
      </label>
      {error && (
        <span className='absolute text-red-500 text-xs -bottom-4 left-0'>
          {error}
        </span>
      )}
    </div>
  );
};

export default Checkbox;
