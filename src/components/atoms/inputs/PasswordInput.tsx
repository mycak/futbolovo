import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { customStyles } from './styles';
import { useState } from 'react';

const PasswordInput = <T extends FieldValues>({
  label,
  placeholder,
  name,
  register,
  error,
  loading,
  autocomplete,
}: {
  label: string;
  placeholder: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
  loading?: boolean;
  autocomplete?: string;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className='relative max-w-80 w-full'>
      <label className='flex flex-col'>
        <span className='text-grass-20'>{label}</span>
        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            id={name}
            disabled={loading}
            className={customStyles({ error: !!error })}
            placeholder={placeholder}
            autoComplete={autocomplete}
            {...register(name)}
          />
          <button
            type='button'
            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <i
              className={`fa-solid ${
                showPassword ? 'text-grass-50' : 'text-grass-30'
              } ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
            />
          </button>
        </div>
      </label>
      {error && (
        <span className='absolute text-red-500 text-xs top-16 right-0'>
          {error}
        </span>
      )}
    </div>
  );
};

export default PasswordInput;
