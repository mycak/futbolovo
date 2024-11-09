import { FieldValues, UseFormRegister } from 'react-hook-form';
import { customStyles } from './styles';

const TextInput = ({
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
    <div className='relative'>
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
