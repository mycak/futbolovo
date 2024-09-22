"use client";
import { useDebounce } from "@/hooks/useDebounce";
import React, { useEffect, useState } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import { customStyles } from "./styles";

const SearchInput = ({
  label,
  placeholder,
  name,
  setValue,
  error,
}: {
  label: string;
  placeholder: string;
  name: string;
  setValue: UseFormSetValue<FieldValues>;
  error?: string;
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
    <div className="relative">
      <label className="flex flex-col">
        <span className="text-grass-20">{label}</span>
        <input
          type="search"
          id="search"
          className={customStyles({ error: !!error })}
          onChange={handleChange}
          value={inputValue}
          placeholder={placeholder}
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

export default SearchInput;
