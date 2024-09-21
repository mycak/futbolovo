"use client";
import { startOfMonth } from "date-fns";
import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { pl } from "date-fns/locale";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import { clsx } from "clsx";
import { customStyles } from "./styles";

registerLocale("pl", pl);

const DateRangeInput = ({
  label,
  disabled = false,
  setValue,
  name,
}: {
  label: string;
  disabled: boolean;
  setValue: UseFormSetValue<FieldValues>;
  name: string;
}) => {
  const monthBeginning = startOfMonth(new Date());

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    monthBeginning,
    monthBeginning,
  ]);
  const [startDate, endDate] = dateRange;

  const onChange = (dates: [Date | null, Date | null]) => {
    setValue(name, dates);
    setDateRange(dates);
  };

  return (
    <div>
      <label className="flex flex-col">
        <span className="text-grass-20">{label}</span>
        <DatePicker
          disabled={disabled}
          selectsRange={true}
          startDate={startDate ?? undefined}
          endDate={endDate ?? undefined}
          onChange={onChange}
          className={clsx(customStyles, disabled && "opacity-75")}
          calendarClassName="!p-1 !border !border-grass-50 !bg-emerald-600 !rounded-sm max-w-80"
          dayClassName={() =>
            "!hover:cursor-pointer !hover:bg-emerald-900 !rounded-sm !text-ivory-150"
          }
          locale="pl"
        />
      </label>
    </div>
  );
};

export default DateRangeInput;
