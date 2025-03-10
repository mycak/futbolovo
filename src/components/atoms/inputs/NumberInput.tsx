'use client';
import { FieldValues, Control, Controller, Path } from 'react-hook-form';
import { customStyles } from './styles';

interface NumberInputProps<T extends FieldValues> {
  label: string;
  placeholder: string;
  name: Path<T>;
  control: Control<T>;
  error?: string;
}

const NumberInput = <T extends FieldValues>({
  label,
  placeholder,
  name,
  control,
  error,
}: NumberInputProps<T>) => {
  return (
    <div className='relative max-w-80 w-full'>
      <label className='flex flex-col price'>
        <span className='text-grass-20'>{label}</span>
        <Controller
          name={name}
          control={control}
          defaultValue={undefined} // Ensure defaultValue is set to avoid uncontrolled warning
          render={(
            { field: { onChange, onBlur, value = '', ref } } // Default value to empty string
          ) => (
            <input
              type='number'
              id={name}
              className={customStyles({ error: !!error })}
              placeholder={placeholder}
              onChange={(e) => {
                // Allow empty string to be passed to form state
                // This enables deletion of values
                const inputValue = e.target.value;
                const newValue = inputValue === '' ? null : Number(inputValue);
                onChange(newValue);
              }} // Convert to number
              onBlur={onBlur}
              // Handle empty string or undefined values in display
              value={!value ? '' : value}
              ref={ref}
            />
          )}
        />
      </label>
      {error && (
        <span className='absolute text-red-500 text-xs -bottom-4 right-0'>
          {error}
        </span>
      )}
    </div>
  );
};

export default NumberInput;
