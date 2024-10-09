"use client";
import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { pl } from "date-fns/locale";
import { Control, Controller, FieldValues } from "react-hook-form";
import { customStyles } from "./styles";

registerLocale("pl", pl);

const DateRangeInput = ({
  label,
  disabled = false,
  control,
  name,
  error,
  placeholder,
  startDate,
  endDate,
}: {
  label: string;
  disabled?: boolean;
  control: Control<FieldValues>;
  name: string;
  error?: string;
  placeholder?: string;
  startDate?: Date;
  endDate?: Date;
}) => {
  const initialStartDate = startDate ?? new Date();
  const initialEndDate = endDate ?? new Date();
  return (
    <div className="relative">
      <label className="flex flex-col">
        <span className="text-grass-20">{label}</span>
        <Controller
          control={control}
          name={name}
          defaultValue={[initialStartDate, initialEndDate]}
          render={({ field: { onChange, value } }) => {
            const [startDate, endDate] = value || [null, null];

            return (
              <DatePicker
                disabled={disabled}
                isClearable
                selectsRange={true}
                startDate={startDate ?? undefined}
                endDate={endDate ?? undefined}
                onChange={(dates) => onChange(dates)}
                className={customStyles({ disabled, error: !!error })}
                calendarClassName="!p-1 !border !border-grass-50 !bg-emerald-600 !rounded-sm max-w-80"
                dayClassName={() =>
                  "!hover:cursor-pointer !hover:bg-emerald-900 !rounded-sm !text-ivory-150"
                }
                clearButtonClassName="after:!bg-transparent after:!text-3xl"
                locale="pl"
                placeholderText={placeholder}
              />
            );
          }}
        />
      </label>
      {error && (
        <span className="absolute text-red-500 text-xs -bottom-4 right-0">
          {error}
        </span>
      )}
    </div>
  );
};

export default DateRangeInput;
