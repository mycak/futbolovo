"use client";
import { useDebounce } from "@/hooks/useDebounce";
import React, { useEffect, useState } from "react";

const SearchInput = ({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) => {
  const DELAY = 1500;
  const [value, setValue] = useState<string>("");
  const debounceValue = useDebounce(value, DELAY);

  useEffect(() => console.log(debounceValue), [debounceValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  return (
    <div>
      <label className="flex flex-col">
        <span className="text-grass-20">{label}</span>
        <input
          type="search"
          id="search"
          className="h-[38px] border border-grass-50 rounded-sm bg-emerald-900 w-80 p-1 pl-2 text-ivory-150 placeholder:text-ivory-150 hover:cursor-pointer hover:border-grass-40 active:outline-none focus:outline-none focus:border-grass-40"
          onChange={handleChange}
          value={value}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
};

export default SearchInput;
