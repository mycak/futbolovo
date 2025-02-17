import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { customStyles } from './styles';

interface TextInputProps<T extends FieldValues> {
  label: string;
  placeholder: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
}

const TextInput = <T extends FieldValues>({
  label,
  placeholder,
  name,
  register,
  error,
}: TextInputProps<T>) => {
  return (
    <div className='relative max-w-80 w-full'>
      <label className='flex flex-col'>
        <span className='text-grass-20'>{label}</span>
        <input
          type='text'
          id='text'
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

export default TextInput;
