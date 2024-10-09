"use client";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { customStyles } from "./styles";

const SearchInput = ({
  label,
  placeholder,
  name,
  register,
  error,
}: {
  label: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  error?: string;
}) => {
  return (
    <div className="relative">
      <label className="flex flex-col">
        <span className="text-grass-20">{label}</span>
        <input
          type="search"
          id="search"
          className={customStyles({ error: !!error })}
          {...register(name)}
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
