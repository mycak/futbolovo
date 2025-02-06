'use client';
import 'react-datepicker/dist/react-datepicker.css'; // Needed to keep styles after refresh
import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { pl } from 'date-fns/locale';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { customStyles } from './styles';
import { useParams } from 'next/navigation';

registerLocale('pl', pl);

const DateInput = ({
  label,
  placeholder,
  disabled = false,
  control,
  name,
  error,
  minDate,
}: {
  label: string;
  disabled?: boolean;
  control: Control<FieldValues>;
  name: string;
  error?: string;
  placeholder: string;
  minDate?: boolean;
}) => {
  const { lng } = useParams();

  return (
    <div className='relative max-w-80 w-full'>
      <label className='flex flex-col'>
        <span className='text-grass-20'>{label}</span>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              disabled={disabled}
              selected={value ?? null}
              minDate={minDate ? new Date() : undefined}
              onChange={(date) => {
                if (date) date.setHours(15, 0, 0, 0);
                onChange(date);
              }}
              className={customStyles({ disabled, error: !!error })}
              calendarClassName='!p-1 !border !border-grass-50 !bg-emerald-600 !rounded-sm max-w-80'
              dayClassName={() =>
                '!hover:cursor-pointer !hover:bg-emerald-900 !rounded-sm !text-ivory-150'
              }
              locale={lng as string}
              placeholderText={placeholder}
            />
          )}
        />
        {error && <span className='text-red-500'>{error}</span>}
      </label>
      {error && (
        <span className='absolute text-red-500 text-xs -bottom-4 right-0'>
          {error}
        </span>
      )}
    </div>
  );
};

export default DateInput;
