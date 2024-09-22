"use client";
import { useEffect, useState } from "react";
import Select, { GroupBase, Props, PropsValue } from "react-select";
import { generateClassNames } from "./styles";
import { Control, Controller, FieldValues } from "react-hook-form";
import { SelectOption } from "@/types/common";

interface ExtendedProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends Props<Option, IsMulti, Group> {
  label: string;
  control: Control<FieldValues>;
  error?: string;
}

const SelectInput = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  label,
  control,
  error,
  ...props
}: ExtendedProps<Option, IsMulti, Group>) => {
  const id = Date.now().toString();

  const [isMounted, setIsMounted] = useState(false);

  const [currentSelectValues, setCurrentSelectValues] = useState<
    SelectOption | SelectOption[] | undefined
  >(undefined);

  useEffect(() => setIsMounted(true), []);

  return isMounted ? (
    <div className="flex flex-col relative">
      <label className="">
        <span className="mb-1 text-grass-20">{label}</span>
        <Controller
          name={props.name as string}
          control={control}
          render={({ field: { onChange, onBlur, ref } }) => {
            return (
              <Select
                {...props}
                theme={(theme) => ({ ...theme, borderRadius: 0 })}
                id={id}
                unstyled
                classNamePrefix="react-select"
                hideSelectedOptions={false}
                classNames={generateClassNames(!!error)}
                value={currentSelectValues as PropsValue<Option> | undefined}
                onChange={(newValue) => {
                  const valueOnlyArray = props.isMulti
                    ? (newValue as SelectOption[]).map((item) => item.value)
                    : (newValue as SelectOption).value;
                  setCurrentSelectValues(
                    newValue as SelectOption | SelectOption[]
                  );
                  onChange(valueOnlyArray);
                }}
                onBlur={onBlur}
                ref={ref}
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
  ) : null;
};

export default SelectInput;
