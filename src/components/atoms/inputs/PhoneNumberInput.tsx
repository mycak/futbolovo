import { FieldValues, UseFormRegister, Path } from 'react-hook-form';
import { customStyles } from './styles';
import { phoneRegex } from '@/constants/common';

interface PhoneNumberInputProps<T extends FieldValues> {
  label: string;
  placeholder: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
}

const PhoneNumberInput = <T extends FieldValues>({
  label,
  placeholder,
  name,
  register,
  error,
}: PhoneNumberInputProps<T>) => {
  return (
    <div className='relative max-w-80 w-full'>
      <label className='flex flex-col'>
        <span className='text-grass-20'>{label}</span>
        <input
          type='tel'
          id='tel'
          pattern={phoneRegex.source}
          className={customStyles({ error: !!error })}
          placeholder={placeholder}
          {...register(name)}
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

export default PhoneNumberInput;
