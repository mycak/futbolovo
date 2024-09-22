"use client";
import { useState } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { customStyles } from "./styles";
import clsx from "clsx";

const FileInput = ({
  label,
  placeholder,
  name,
  control,
  error,
}: {
  label: string;
  placeholder: string;
  name: string;
  control: Control<FieldValues>;
  error?: string;
}) => {
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div className="flex flex-col relative">
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <>
            <label className="text-grass-20 relative" htmlFor="upload-photo">
              {label}

              <input
                type="file"
                id="upload-photo"
                className="opacity-0 absolute top-6 left-0 w-full h-[38px]"
                placeholder={placeholder}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setFileName(file ? file.name : null);
                  onChange(file);
                }}
              />
              <p
                className={clsx(
                  customStyles({ error: !!error }),
                  "mt-0! pt-[7px]"
                )}
              >
                {fileName?.length ? fileName : "Wybierz plik"}
              </p>

              {!fileName && (
                <span className="text-gray-500 text-sm">
                  Brak wybranego pliku
                </span>
              )}
            </label>

            {fileName && (
              <button
                type="button"
                className="mt-2 text-red-500 hover:underline text-sm"
                onClick={() => {
                  setFileName(null);
                  onChange(null);
                }}
              >
                Wyczyść
              </button>
            )}
            {error && (
              <span className="absolute text-red-500 text-xs bottom-6 right-0">
                {error}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
};

export default FileInput;
