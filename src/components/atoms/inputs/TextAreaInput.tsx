import { FieldValues, UseFormRegister } from "react-hook-form";

const TextAreaInput = ({
  label,
  placeholder,
  name,
  register,
}: {
  label: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<FieldValues>;
}) => {
  return (
    <div>
      <label className="flex flex-col">
        <span className="text-grass-20">{label}</span>
        <textarea
          id="textarea"
          className="h-[80px] border border-grass-50 rounded-sm bg-emerald-900 w-80 p-1 pl-2 text-ivory-150 placeholder:text-ivory-150 hover:cursor-pointer hover:border-grass-40 active:outline-none focus:outline-none focus:border-grass-40"
          placeholder={placeholder}
          {...register(name)}
        />
      </label>
    </div>
  );
};

export default TextAreaInput;
