'use client';
import 'react-datepicker/dist/react-datepicker.css'; // Needed to keep styles after refresh
import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { pl } from 'date-fns/locale';
import { FieldValues, UseFormSetValue, Path, PathValue } from 'react-hook-form';
import { customStyles } from './styles';
import { useParams } from 'next/navigation';

registerLocale('pl', pl);

interface DateRangeInputProps<T extends FieldValues> {
  label: string;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  setValue: UseFormSetValue<T>;
  minDate?: boolean;
}

const DateRangeInput = <T extends FieldValues>({
  label,
  disabled = false,
  error,
  placeholder,
  startDate,
  endDate,
  setValue,
  minDate,
}: DateRangeInputProps<T>) => {
  const { lng } = useParams();
  return (
    <div className='relative max-w-80 w-full'>
      <label className='flex flex-col'>
        <span className='text-grass-20'>{label}</span>

        <DatePicker
          disabled={disabled}
          isClearable
          selectsRange
          selected={startDate}
          minDate={minDate ? new Date() : undefined}
          startDate={startDate}
          endDate={endDate}
          onChange={(dates) => {
            const [start, end] = dates;
            if (start) start.setHours(15, 0, 0, 0);
            if (end) end.setHours(15, 0, 0, 0);
            setValue('startDate' as Path<T>, start as PathValue<T, Path<T>>);
            setValue('endDate' as Path<T>, end as PathValue<T, Path<T>>);
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
