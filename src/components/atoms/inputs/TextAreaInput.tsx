import clsx from 'clsx';
import { FieldValues, UseFormRegister } from 'react-hook-form';

const TextAreaInput = ({
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
    <div className='relative max-w-80 w-full'>
      <label className='flex flex-col'>
        <span className='text-grass-20'>{label}</span>
        <textarea
          id='textarea'
          className={clsx(
            'h-[80px] border border-grass-50 rounded-sm bg-emerald-900 w-full p-1 pl-2 text-ivory-150 placeholder:text-ivory-150 hover:cursor-pointer hover:border-grass-40 active:outline-none focus:outline-none focus:border-grass-40',
            error && 'border-red-500 focus:border-red-400 hover:border-red-400'
          )}
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

export default TextAreaInput;
