"use client";
import { useDebounce } from "@/hooks/useDebounce";
import React, { useEffect, useState } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";

const SearchInput = ({
  label,
  placeholder,
  name,
  setValue,
}: {
  label: string;
  placeholder: string;
  name: string;
  setValue: UseFormSetValue<FieldValues>;
}) => {
  const DELAY = 1500;
  const [inputValue, setInputValue] = useState<string>("");
  const debounceValue = useDebounce(inputValue, DELAY);

  useEffect(() => {
    setValue(name, debounceValue);
  }, [debounceValue, name, setValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value);

  return (
    <div>
      <label className="flex flex-col">
        <span className="text-grass-20">{label}</span>
        <input
          type="search"
          id="search"
          className="h-[38px] border border-grass-50 rounded-sm bg-emerald-900 w-80 p-1 pl-2 text-ivory-150 placeholder:text-ivory-150 hover:cursor-pointer hover:border-grass-40 active:outline-none focus:outline-none focus:border-grass-40"
          onChange={handleChange}
          value={inputValue}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
};

export default SearchInput;
