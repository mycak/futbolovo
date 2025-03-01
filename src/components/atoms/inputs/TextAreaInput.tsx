import clsx from 'clsx';
import { FieldValues, UseFormRegister, Path } from 'react-hook-form';

interface TextAreaInputProps<T extends FieldValues> {
  label: string;
  placeholder: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
}

const TextAreaInput = <T extends FieldValues>({
  label,
  placeholder,
  name,
  register,
  error,
}: TextAreaInputProps<T>) => {
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
