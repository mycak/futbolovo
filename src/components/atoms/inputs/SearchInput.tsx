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
          className={customStyles}
          onChange={handleChange}
          value={inputValue}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
};

export default SearchInput;
