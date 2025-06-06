'use client';
import { useEffect, useState } from 'react';
import Select, { GroupBase, Props, PropsValue } from 'react-select';
import { generateClassNames } from './styles';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { SelectOption } from '@/types/common';

interface ExtendedProps<
  T extends FieldValues,
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends Props<Option, IsMulti, Group> {
  label: string;
  control: Control<T>;
  name: Path<T>;
  error?: string;
}

const SelectInput = <
  T extends FieldValues,
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  label,
  control,
  error,
  ...props
}: ExtendedProps<T, Option, IsMulti, Group>) => {
  const id = Date.now().toString();

  //WORKAROUND FOR CONSOLE ERROR
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const [currentSelectValues, setCurrentSelectValues] = useState<
    SelectOption | SelectOption[] | undefined
  >(undefined);

  useEffect(() => setIsMounted(true), []);

  return isMounted ? (
    <div className='flex flex-col relative max-w-80 w-full'>
      <label className=''>
        <span className='mb-1 text-grass-20'>{label}</span>
        <Controller
          name={props.name as Path<T>}
          control={control}
          render={({ field: { onChange, onBlur, ref, value } }) => {
            //USEFUL FOR FORM ONLY-VALUE POPULATION
            const selectValue =
              !currentSelectValues && value
                ? Array.isArray(value)
                  ? value.map((val: string) =>
                      (props.options as unknown as SelectOption[]).find(
                        (option) => option.value === val
                      )
                    )
                  : (props.options as unknown as SelectOption[]).find(
                      (option) => option.value === value
                    )
                : value === undefined
                ? []
                : currentSelectValues;

            return (
              <Select
                {...props}
                theme={(theme) => ({ ...theme, borderRadius: 0 })}
                id={id}
                unstyled
                classNamePrefix='react-select'
                hideSelectedOptions={false}
                classNames={generateClassNames(!!error)}
                value={selectValue as PropsValue<Option> | undefined}
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
        <span className='absolute text-red-500 text-xs -bottom-4 right-0'>
          {error}
        </span>
      )}
    </div>
  ) : null;
};

export default SelectInput;
