import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { customStyles } from './styles';

const PasswordInput = <T extends FieldValues>({
  label,
  placeholder,
  name,
  register,
  error,
  loading,
}: {
  label: string;
  placeholder: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
  loading?: boolean;
}) => {
  return (
    <div className='relative max-w-80 w-full'>
      <label className='flex flex-col'>
        <span className='text-grass-20'>{label}</span>
        <input
          type='password'
          id={name}
          disabled={loading}
          className={customStyles({ error: !!error })}
          placeholder={placeholder}
          {...register(name)}
        />
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
