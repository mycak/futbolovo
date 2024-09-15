"use client";
import { startOfMonth } from "date-fns";
import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { pl } from "date-fns/locale";
import { FieldValues, UseFormSetValue } from "react-hook-form";

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
          className="h-[38px] border border-grass-50 rounded-sm bg-emerald-900 w-80 p-1 pl-2 text-ivory-150 placeholder:text-ivory-150 hover:cursor-pointer hover:border-grass-40 active:outline-none focus:outline-none focus:border-grass-40"
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
