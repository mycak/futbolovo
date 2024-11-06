"use client";
import { FieldValues, Control, Controller } from "react-hook-form";
import { customStyles } from "./styles";

const NumberInput = ({
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
  return (
    <div className="relative">
      <label className="flex flex-col price">
        <span className="text-grass-20">{label}</span>
        <Controller
          name={name}
          control={control}
          defaultValue={undefined} // Ensure defaultValue is set to avoid uncontrolled warning
          render={(
            { field: { onChange, onBlur, value = "", ref } }, // Default value to empty string
          ) => (
            <input
              type="number"
              id={name}
              className={customStyles({ error: !!error })}
              placeholder={placeholder}
              onChange={(e) =>
                onChange(e.target.value ? Number(e.target.value) : undefined)
              } // Convert to number
              onBlur={onBlur}
              value={value}
              ref={ref}
            />
          )}
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

export default NumberInput;
