'use client';
import 'react-datepicker/dist/react-datepicker.css'; // Needed to keep styles after refresh
import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { pl } from 'date-fns/locale';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import { customStyles } from './styles';
import { useParams } from 'next/navigation';

registerLocale('pl', pl);

const DateRangeInput = ({
  label,
  disabled = false,
  error,
  placeholder,
  startDate,
  endDate,
  setValue,
  minDate,
}: {
  label: string;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  setValue: UseFormSetValue<FieldValues>;
  minDate?: boolean;
}) => {
  const { lng } = useParams();
  return (
    <div className='relative max-w-80 w-full'>
      <label className='flex flex-col'>
        <span className='text-grass-20'>{label}</span>

        <DatePicker
          disabled={disabled}
          isClearable
          selectsRange={true}
          minDate={minDate ? new Date() : undefined}
          startDate={startDate ?? undefined}
          endDate={endDate ?? undefined}
          onChange={(dates) => {
            const [start, end] = dates;
            if (start) start.setHours(15, 0, 0, 0);
            if (end) end.setHours(15, 0, 0, 0);
            setValue('startDate', start);
            setValue('endDate', end);
          }}
          className={customStyles({ disabled, error: !!error })}
          shouldCloseOnSelect
          calendarClassName='!p-1 !border !border-grass-50 !bg-emerald-600 !rounded-sm max-w-80'
          dayClassName={() =>
            '!hover:cursor-pointer !hover:bg-emerald-900 !rounded-sm !text-ivory-150'
          }
          clearButtonClassName='after:!bg-transparent after:!text-3xl'
          locale={lng as string}
          placeholderText={placeholder}
        />
      </label>
      {error && (
        <span className='absolute text-red-500 text-xs -bottom-4 right-0'>
          {error}
        </span>
      )}
    </div>
  );
};

export default DateRangeInput;
